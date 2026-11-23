# Foodify — getting it running

Part 1 gets it running on your phone and laptop. Everything after that is optional.

A free GitHub account is only needed if you want to host it (Part 1, Step 2) or sync between
devices (Part 4). Total time: about 15 minutes.

---

## Part 1 — Get the app running

### Step 1. What you have

The `foodify` folder is the whole app:

```
foodify/
  index.html              the app itself
  manifest.webmanifest    tells the phone it can be installed
  icons/                  the icon, in every size a phone asks for
```

Double-click `index.html` and it opens in your browser, working, with no install. Click
**Načíst 10 ukázkových receptů** on the Plán tab to see it with data in it.

> **Where your data lives:** in that browser, on that device. It is not sent anywhere. So your
> phone and your laptop keep separate plans unless you set up sync (Part 4), and clearing your
> browser's site data erases everything (Part 5 covers backups).

### Step 2. Put it on the web

You need this for the icon, for installing it on a phone, and for sharing.

1. Go to [github.com/new](https://github.com/new).
2. Name it `foodify`. Choose **Public**. Tick **Add a README file**. Create.
3. Click **Add file → Upload files** and drag in **the contents of the `foodify` folder** —
   `index.html`, `manifest.webmanifest`, and the `icons` folder. Dragging the folder itself
   keeps the structure. Commit.
4. **Settings → Pages** → Source: **Deploy from a branch**, branch **main**, folder
   **/ (root)**. Save.
5. Wait a minute or two, reload, and it shows your address:

   ```
   https://YOURNAME.github.io/foodify/
   ```

The file must be named exactly `index.html`, and `icons/` must sit next to it — that's how the
icon and the install prompt find each other.

### Step 3. Install it on your phone

Open your Pages URL on the phone:

- **iPhone (Safari):** Share → **Add to Home Screen**. It appears as *Foodify* with the bowl
  icon. Safari only offers this from Safari itself — not Chrome on iOS.
- **Android (Chrome):** you'll usually get an *Install app* prompt at the bottom. If not,
  menu ⋮ → **Add to Home screen** → *Install*.

It then opens without browser chrome, like an ordinary app. The phone keeps its own data
separate from your laptop until you set up sync.

**On a laptop:** Chrome and Edge show an install icon at the right-hand end of the address bar.

---

## Part 2 — Sharing a recipe with a friend

Open the **Recepty** tab and press **Zkopírovat odkaz ke sdílení** on any recipe card. The
whole recipe — ingredients, method, category, everything — is packed into the link itself, so
you can paste it into any chat. When your friend opens it, Foodify shows a preview and asks
whether to add it.

No accounts, no GitHub, nothing uploaded anywhere. The recipe travels in the part of the URL
after the `#`, which browsers never send to a server.

A link runs to roughly a thousand characters. Some chat apps break long URLs across lines — if
that happens, send it as a code block, or use the whole-collection route instead:
**Nastavení → Záloha a přenos → Exportovat JSON** gives a file with everything in it, and your
friend takes just the recipes from it with **Importovat JSON → Jen přidat recepty k mým**.

---


## Part 3 — First-run setup inside the app

Work down the **Nastavení** tab in this order. Ten minutes now saves a lot of confusion later.

| # | Setting | What to think about |
|---|---------|--------------------|
| 1 | **Kolik lidí jí** | Every batch size is calculated from this. |
| 2 | **Snídaně / Oběd / Večeře** | Turn off what you don't plan. Breakfast is off by default. |
| 3 | **Odkud se bere oběd** | *Zbytek z večeře* means you cook once and eat twice. This is the big labour saver. |
| 4 | **Studená večeře** | Turn on if some evenings are just bread and cheese. Then set meals per batch to **3**: večeře → oběd → studená večeře → oběd. |
| 5 | **Dny vaření** | Be honest about which evenings you'll actually cook. |
| 6 | **Kolik jídel z jednoho vaření** | How many times you'll eat the same thing before you get bored. |
| 7 | **Velký nákup** | Which day, and weekly or fortnightly. |
| 8 | **Kontrola zásob** | Leave on. It reminds you to look in the cupboards before each big shop. |

Then add recipes on the **Recepty** tab, or load the ten samples and edit them. Aim for at
least 8–10 dinner recipes; fewer than that and the variety rules can't do their job, and the
plan will tell you so.

Last, on the **Spíž** tab, scroll to **Trvanlivost** and correct anything wrong. This is the
setting with the biggest effect on your shopping: telling the app that chicken keeps 10 days
because you freeze it moves it from a small top-up trip onto the big weekly shop.

---

## Part 4 — Sync your phone and laptop

By default each device keeps its own copy. If you want them to match, the app can store your
data in a **private GitHub gist** and read it back on the other device. Optional; skip it and
nothing changes.

### Step 4. Make a token

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens) →
   **Generate new token** → **Generate new token (classic)**.
2. Note: `Foodify sync`. Expiration: whatever you're comfortable with — you'll have to
   repeat this when it expires.
3. Scopes: tick **gist** and *nothing else*. That checkbox grants access to your gists only —
   not your repos, not your account.
4. Generate, and copy the token. GitHub shows it once.

### Step 5. Turn sync on, laptop first

1. Open the app → **Nastavení** → **Synchronizace mezi zařízeními**.
2. Paste the token into **GitHub token**.
3. Click **Vytvořit nový gist**. An ID appears in the field next to it — copy it.
4. Leave **Synchronizovat automaticky** ticked.

### Step 6. Now the phone

1. Open the app on the phone → **Nastavení** → same card.
2. Paste the **same token** and the **gist ID** from step 10.
3. Press **Synchronizovat teď**. Your recipes and settings arrive.

From then on, edits are pushed a few seconds after you make them, and each device pulls
anything newer when you open the app.

### If both devices changed since the last sync

The app stops and asks rather than guessing. You get both timestamps and two buttons —
*Nechat tohle zařízení* or *Vzít tu druhou*. Whichever you don't pick is overwritten, so if
both contain work you want, export a backup first.

### About the token

- It is stored **in that browser only**. It is never written into the app file, never included
  in your exports, and never sent anywhere except `api.github.com`.
- Because it lives in the browser and not the file, friends using your hosted copy of the app
  never see it and can set up their own sync with their own token.
- If it ever leaks, revoke it at
  [github.com/settings/tokens](https://github.com/settings/tokens). Nothing else is at risk —
  the `gist` scope can't touch your repositories.
- Public/shared computers: don't. Use export and import instead.

### The no-token alternative

If you'd rather not create a token, export from one device, put the file in Dropbox, iCloud
Drive or Google Drive, and import it on the other. Same result, manual, no credentials
anywhere.

---

## Part 5 — Backups and updates

**Back up before anything risky.** Nastavení → Záloha a přenos → **Exportovat JSON** →
*Stáhnout soubor*. Keep it somewhere safe.

**Moving to a new device or browser:** export on the old one, then on the new one use
**Importovat JSON** → *Nahradit všechno*.

**Getting just the recipes from a friend's backup:** *Importovat JSON* → **Jen přidat recepty
k mým**. Your settings and plan are left alone, and duplicates are skipped.

**Updating the app itself:** upload the new `index.html` over the old one in the repo. Your
data is in the browser, not the file, so nothing is lost.

---

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Nothing saves between visits | Private/incognito window, or the browser is clearing site data on exit. Use a normal window. |
| GitHub Pages shows a 404 | The file must be named exactly `index.html`. Also check Settings → Pages says branch `main`, folder `/ (root)`. Give it 2 minutes after the first save. |
| No icon, or no install prompt | `manifest.webmanifest` and the `icons` folder must sit next to `index.html`. Open `yoursite/icons/icon-192.png` directly — if that 404s, the upload lost the folder structure. |
| Icon is right but installs as "index" | The manifest didn't load. Same check as above, then reload with a hard refresh. |
| Share link doesn't import | It has to be the whole link. Some chat apps break long URLs across lines — send it as a code block, or export the recipes to a file instead. |
| Plan has empty meals | Not enough recipes for the variety rules, or too few cooking days. The line under the statistics says which. |
| A shopping run is flagged *kupte až blíž k datu* | The item won't survive from that shop to the day you cook it. Either raise its shelf life in **Trvanlivost** if you'll freeze it, or turn on **Malé dokupování**. |
| Everything looks wrong after an import | Nastavení → **Vymazat vše**, then import a known-good backup. |
| Sync says *GitHub token odmítl* | The token is wrong, or expired, or was created without the **gist** scope. Make a new one. |
| Sync says *Gist s tímhle ID se nenašel* | The ID is mistyped, or the gist belongs to a different account than the token. |
| Devices keep asking who wins | One of them has a clock that's badly off. Check the date and time settings on both. |
