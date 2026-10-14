# Etambuyu Katota — personal website

A single-page portfolio site: plain HTML, CSS and a little JavaScript.
No frameworks, no build step and no paid services. Anything that can serve
static files can host it.

## What's in this folder

```
index.html                 The whole page (all text lives here)
404.html                   Shown when someone opens a wrong address
css/style.css              All styling (colours and fonts at the top)
js/main.js                 Highlights the current section in the menu, updates the footer year
assets/img/                Photos, document covers, favicon, social-sharing image
assets/docs/               The CV and the work-sample PDFs
assets/fonts/              Source Sans 3 (self-hosted, free licence in OFL-LICENSE.txt)
robots.txt                 Lets search engines index the site
```

## 1. Run it on your computer

You only need one of these:

**Option A: VS Code (easiest for editing)**
1. Install [VS Code](https://code.visualstudio.com/) and the **Live Server** extension.
2. Open this folder in VS Code (File → Open Folder).
3. Right-click `index.html` → **Open with Live Server**. The page reloads every time you save.

**Option B: Python (already on most computers)**
```bash
cd path/to/this/folder
python -m http.server 8000      # on some systems: python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser.

Opening `index.html` by double-clicking also works for a quick look.

## 2. Editing

- **Text:** everything is in `index.html`, in clearly named sections: `about`, `experience`, `work`, `skills`, `education`, `contact`.
- **A new job:** copy one `<li class="role">…</li>` block in the Experience section, paste it at the top and change the text.
- **A new document:** put the PDF in `assets/docs/`, a cover image (about 560 px wide, `.webp` or `.jpg`) in `assets/img/`, then copy one `<li class="doc">…</li>` block and update the file names, title and description.
- **A new video:** copy one `<li class="clip">…</li>` block and paste in the new link.
- **The CV:** replace `assets/docs/Etambuyu-Katota-CV.pdf` with the new file, using the same name.
- **Colours:** change the values at the top of `css/style.css` (`--navy`, `--teal`, and so on).

Keep file names lower case with hyphens and no spaces, for example `new-factsheet-2026.pdf`.
Free hosts reject single files over 25 MB, so compress large PDFs before adding them.

## 3. Publish it for free

### Recommended: GitHub + Cloudflare Pages

You get a free address like `https://etambuyu-katota.pages.dev`, free HTTPS and fast loading.
Every time you save a change to GitHub, the live site updates within about a minute.

**One-time setup**
1. Create a free account at [github.com](https://github.com) (ideally in Etambuyu's name, so she owns it).
2. Install [Git](https://git-scm.com/downloads), then in this folder run:
   ```bash
   git init
   git add .
   git commit -m "First version of the website"
   ```
3. On GitHub, create a new **empty** repository called `etambuyu-katota` (no README), then run the two commands GitHub shows you. They look like:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/etambuyu-katota.git
   git branch -M main
   git push -u origin main
   ```
4. Create a free account at [dash.cloudflare.com](https://dash.cloudflare.com/sign-up).
5. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, then choose the `etambuyu-katota` repository.
6. Build settings: **Framework preset: None**, **Build command: leave empty**, **Build output directory: `/`**. Click **Save and Deploy**.
7. The site is live at `https://<project-name>.pages.dev`. The project name becomes the address, so call the project `etambuyu-katota` if that name is free.

**Every later change**
```bash
git add .
git commit -m "Describe the change, e.g. Add 2026 factsheet"
git push
```
Cloudflare publishes it automatically. To undo a bad change, open Cloudflare → the project → **Deployments**, and roll back to an earlier version.

### Alternative: GitHub Pages only (one account)

1. Follow steps 1–3 above.
2. On GitHub: the repository → **Settings → Pages** → Source: **Deploy from a branch**, Branch: `main`, Folder: `/ (root)` → Save.
3. The site appears at `https://YOUR-USERNAME.github.io/etambuyu-katota/`.
   If the GitHub username is `etambuyukatota` and the repository is named `etambuyukatota.github.io`, the address becomes `https://etambuyukatota.github.io`.

## 4. Where the site lives now

- **Live address:** https://etambuyukatota.github.io
- **Host:** GitHub Pages, repository `etambuyukatota/etambuyukatota.github.io`, branch `main`, folder `/ (root)`.
- **To update without Git:** on GitHub, open the folder that holds the file (for example `assets/docs`), click
  **Add file → Upload files**, drag in the new file with the *same name*, and click **Commit changes**.
  The live site updates within about a minute.
- **Already done:** link-preview tags and canonical address in `index.html`, and the CV QR code points here.
- **Still to check:** each Google Drive video is shared as *Anyone with the link* (test in a private window).

## 5. Later: your own domain (optional, paid)

If you ever buy a domain such as `etambuyukatota.com`, add it in Cloudflare Pages under
**Custom domains**. Hosting stays free; only the domain costs money (around US$10–12 a year for a `.com`).
