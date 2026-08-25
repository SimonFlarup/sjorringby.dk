# Sjorring By - Angular Migration

This Angular app is the migrated version of the original Jekyll site, keeping only these pages:

- `index`
- `forsamling`
- `kis`
- `omkring`
- `contact`
- `404`

## Local development

```bash
npm install
npm start
```

Open `http://localhost:4200/`.

## Build

```bash
npm run build
```

## GitHub Pages deployment

The project is configured for hash-based routing (`/#/route`) so routes work on GitHub Pages.

```bash
npm run deploy:gh-pages
```

By default, `build:gh-pages` uses:

```bash
ng build --base-href /
```

This is correct when the site is served from the custom domain `sjorringby.dk`.

If you deploy to the default GitHub Pages project URL instead of the custom domain, update the
`build:gh-pages` script in `package.json` to use your repository path, for example `/repo-name/`.
