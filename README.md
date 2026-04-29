# Florent Code League

Platform for the Florent Code League — a Nordic university coding competition at [league.florent.vc](https://league.florent.vc).

## Structure

```
app/               Next.js 16 website (league.florent.vc)
docs/              Game documentation (Mintlify)
spec/              Full game rules — units, buildings, turrets, resources
api/               Controller methods, types/enums, game constants
getting-started/   Installation, first bot, running matches, submitting
```

## Website

```bash
npm run dev     # dev server at localhost:3000
npm run build   # production build
```

## Game Docs

```bash
npm i -g mint
mint dev        # preview at localhost:3000
```

Docs auto-deploy via the Mintlify GitHub app on push to `main`.
