# Song Request

Integration addon for StreamKit+.

- **Addon id:** `song-request`
- **Type:** `application`
- **Version:** `1.1.0`

UI styles follow the main app theme via `/data/styles.css` (CSS variables and `.App` controls). Addon CSS only covers layout and song-request-specific pieces.

YouTube links in donation messages are parsed even when the platform HTML-escapes query separators (`&amp;` instead of `&`), including Mix/Radio URLs with `list` / `start_radio` params.

Video metadata is resolved via YouTube oEmbed (title/thumbnail), with optional watch-page enrichment for duration/views when YouTube is not bot-blocking the request.

### Playback modes

Settings include **Playback mode**:

- **YouTube iFrame** (default) — plays through the embedded YouTube player.
- **Download clip to PC** — on play, the clip is downloaded with yt-dlp into `ADDON_TMP_DIR` (cached as `{videoId}_song.*` / `_low.*` / `_medium.*` / `_high.*`) and played locally in the application window. **Download quality** chooses audio-only or low/medium/high video.

Requires StreamKit+ `>= 1.0.45` (`FILE_ACCESS`, `ADDON_TMP_DIR`, yt-dlp conversion options).

Donation processing logs to the addon console with the `[song-request][donation]` / `[song-request][getVideoInfo]` prefixes (record payload, extracted message, URL parse, amount/filters, metadata fetch, queue result) to debug missed requests.


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
