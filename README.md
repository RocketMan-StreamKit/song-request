# My StreamKit Addon

Integration addon for StreamKit+.

- **Addon id:** `song-request`
- **Type:** `application`
- **Minimum StreamKit+:** `1.0.30`

> **Warning:** This addon uses a `REPO`-only id (no `ORG/` prefix). That format is reserved for official RocketMan-StreamKit catalog addons. It **cannot be published** to the catalog, and StreamKit+ may treat a local install as unsafe.

## Development

1. Open **Settings** in StreamKit+ and install this folder.
2. Approve the requested permissions.
3. Enable the addon and configure settings.


## Build

```bash
npm install
npm run build
```

Install the `dist/` folder in StreamKit+ (contains `manifest.json`, worker, and assets).

## Release

This project uses a `REPO`-only addon id, so it is intended for **local development only** and cannot be published to the RocketMan catalog. You can still use the release workflow to build GitHub Release assets for personal distribution.

Docs: [StreamKit+ addon developer docs](https://rocketman-streamkit.github.io/types/)
