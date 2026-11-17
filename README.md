# Alfie Tabachnick portfolio

A complete website. No build step, no installs: these files are the site.

| File | What it is |
|---|---|
| `index.html` | The page itself. You shouldn't need to touch it. |
| `projects.js` | **Your content.** Your details and every project. The only file you edit. |
| `images/` | Your photos and screenshots. |
| `style.css`, `site.js` | The look and the behaviour. Leave alone unless you want to restyle. |

To preview on your computer, double-click `index.html`.

## 1. Fill in your details

Open `projects.js` in any text editor (VS Code, Notepad, TextEdit) and fill in the `SITE` block at the top: about text, email, LinkedIn, GitHub. For a résumé, drop `resume.pdf` in this folder and set `resume: "resume.pdf"`.

## 2. Put it online with GitHub Pages (free)

1. Make a GitHub account at github.com if you don't have one. Your username ends up in the address, so pick a professional one.
2. Create a new **public** repository named exactly `YOUR-USERNAME.github.io`.
3. On the repository page choose **Add file > Upload files**, drag in everything inside this folder (including the `images` folder), and press **Commit changes**.
4. Wait a minute or two, then visit `https://YOUR-USERNAME.github.io`. If nothing shows, check **Settings > Pages** and make sure it is set to deploy from the `main` branch.

Alternative with no account setup: go to app.netlify.com/drop and drag this whole folder onto the page.

## 3. Add a project

1. Put its images in `images/` (JPG or PNG, ideally under 500 KB each so the page loads fast).
2. In `projects.js`, copy the template at the bottom, paste it into the `PROJECTS` list, and fill it in.
3. Upload the changed `projects.js` and the new images to the repository the same way as before. The site updates in about a minute.

Each project gets its own page automatically. Its address is `https://YOUR-USERNAME.github.io/#p-` followed by the project's `id`, so you can link straight to one project from a résumé or application.

## 4. Optional: your own domain

Buy a domain (for example from Namecheap, Cloudflare or Porkbun), then in the repository open **Settings > Pages > Custom domain**, enter it, and follow GitHub's instructions for the DNS records.

## If the page goes blank after an edit

It is almost always a missing comma or quote in `projects.js`. Compare your new project against the template, and check there is a comma between projects.
