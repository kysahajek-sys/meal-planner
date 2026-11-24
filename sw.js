/* Foodify service worker.
   Two jobs: make the app usable with no signal (a shopping list is needed in a shop,
   where reception is worst), and satisfy the browser's conditions for offering to
   install it. Your data never comes near this file — it lives in the browser's own
   storage, and the worker only caches the page, the icons and the fonts. */

const VERSION = "foodify-v1";
const SHELL = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon.ico",
];
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    // one slow file should not fail the whole install
    await Promise.all(SHELL.map(url => cache.add(url).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

const putSafely = async (request, response) => {
  if (!response || !response.ok) return response;
  const cache = await caches.open(VERSION);
  cache.put(request, response.clone()).catch(() => {});
  return response;
};

self.addEventListener("fetch", event => {
  const { request } = event;
  if (request.method !== "GET") return;                       // never touch the sync writes

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = FONT_HOSTS.includes(url.hostname);
  if (!sameOrigin && !isFont) return;                         // GitHub API and anything else: straight through

  // The page itself: newest wins when there is a network, cache when there is not.
  // That way editing index.html is enough to ship an update — no version to bump.
  if (request.mode === "navigate" || (sameOrigin && url.pathname.endsWith(".html"))) {
    event.respondWith((async () => {
      try {
        return await putSafely(request, await fetch(request));
      } catch (e) {
        return (await caches.match(request)) || (await caches.match("index.html")) ||
               (await caches.match("./")) || Response.error();
      }
    })());
    return;
  }

  // Icons, manifest, fonts: answer from cache at once, refresh in the background.
  event.respondWith((async () => {
    const hit = await caches.match(request);
    const live = fetch(request).then(res => putSafely(request, res)).catch(() => null);
    return hit || (await live) || Response.error();
  })());
});
