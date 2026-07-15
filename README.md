# Song Request

Integration addon for StreamKit+.

- **Addon id:** `song-request`
- **Type:** `application`

UI styles follow the main app theme via `/data/styles.css` (CSS variables and `.App` controls). Addon CSS only covers layout and song-request-specific pieces.


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

Docs: [StreamKit+ addon developer docs](https://rocketman-streamkit.github.io/types/)
