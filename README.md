# Foodify

A meal planner that turns your recipes into cooking days and dated shopping runs.
One HTML file, no server, no account. Your data stays in your browser.

- Plans breakfast, lunch and dinner across a month, with leftovers and cold-dinner days
- Scales every batch to how many people are eating
- Sorts the shopping into big shops and small top-up trips, using how long each
  ingredient keeps
- Czech and English, switchable at any time
- Installs to a phone home screen and works with no signal

## Put it online

1. Create a repository and upload **everything in this folder**, keeping the
   `icons/` and `screenshots/` folders intact.
2. **Settings → Pages →** Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. Wait a minute, then open `https://YOURNAME.github.io/REPO/`.

The file must stay named `index.html`, and `manifest.webmanifest`, `sw.js` and `icons/`
must sit next to it — that is how the icon and the install prompt find each other.

## Install it as an app

Open the published address and then:

- **iPhone** — Safari only: Share → *Add to Home Screen*
- **Android** — Chrome offers *Install app*, or menu ⋮ → *Add to Home screen*
- **Desktop** — Chrome and Edge show an install button at the end of the address bar

## What is in here

| | |
|---|---|
| `index.html` | the whole app |
| `manifest.webmanifest` | name, colours and icons for the installed app |
| `sw.js` | offline support; also what makes browsers offer to install it |
| `icons/` | the icon at every size Android, iOS and desktop ask for |
| `screenshots/` | shown in Android's install dialog |
| `.nojekyll` | stops GitHub Pages running the files through Jekyll |

## Your data

Recipes, plan, pantry and settings live in the browser's own storage on each device.
Nothing is uploaded. Two things follow from that:

- Clearing the browser's site data erases everything — use
  **Nastavení → Záloha a přenos → Exportovat JSON** now and then.
- Each device keeps its own copy, unless you turn on sync
  (**Nastavení → Synchronizace**), which stores one JSON file in a private GitHub gist
  using a token you create yourself. The token never leaves that browser and is not
  included in exports.

## Recipe files

Each recipe can be saved as a JSON file (**Stáhnout JSON** on its card). To load one, open
**Přidat recept** and press **Načíst ze souboru** — the form fills in for you to check and save.

```json
{
  "name": "Svíčková",
  "servings": 6,
  "category": "Knedlíky",
  "protein": "Hovězí",
  "diet": "",
  "slots": ["dinner"],
  "tested": false,
  "notes": "Zeleninu a maso upéct, rozmixovat, přidat smetanu.",
  "ingredients": [
    { "qty": 1,   "unit": "kg", "name": "hovězí zadní" },
    { "qty": 300, "unit": "g",  "name": "kořenová zelenina" },
    { "qty": 250, "unit": "ml", "name": "smetana" }
  ]
}
```

Only `name` and at least one ingredient are required. `diet` is `""`, `"vegetarian"` or
`"vegan"`; `slots` takes any of `breakfast`, `lunch`, `dinner`; `tested` is `true` only for
a recipe you've already cooked — leave it out and the recipe comes in as untried; units are
`g kg ml l pcs tbsp tsp bunch can pack`. Leave out `aisle` and Foodify guesses it from the
ingredient name. A file can also hold a list of recipes — `[ {…}, {…} ]` — and backups and
older library files work too.

## Updating

Upload a new `index.html` over the old one. The service worker fetches the page from the
network whenever there is one, so the change arrives on the next open — there is no
version number to bump. Your data is untouched, because it lives in the browser rather
than in the file.

## Licence

Do whatever you like with it.
