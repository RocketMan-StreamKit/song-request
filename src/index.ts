/** Fallback when `currency.getList` is unavailable during load. */
const FALLBACK_CURRENCY_OPTIONS: { value: string; label: { en: string } }[] = [
  { value: 'USD', label: { en: 'United States Dollar (USD)' } },
];

/**
 * Builds the addon settings schema for the given currency options.
 * @param currencyOptions Select options for the currency field.
 * @returns Schema passed to `GenerateConfig`.
 * @example
 * GenerateConfig(buildSettingsSchema(FALLBACK_CURRENCY_OPTIONS));
 */
function buildSettingsSchema(
  currencyOptions: { value: string; label: { en: string } }[]
) {
  return [
    {
      key: '_about',
      type: 'info' as const,
      editor: {
        label: {
          en: 'How it works',
          ru: 'Как это работает',
          uk: 'Як це працює',
        },
        description: {
          en: 'This addon lets viewers request music via donations. If a donation message contains a YouTube video link and the amount is at least the minimum set below, the video is added to the queue when it also passes the other filters (duration, views, likes).',
          ru: 'Этот аддон нужен для заказа музыки. Зрители могут донатить, указывая ссылку на YouTube-видео в тексте доната. Если ссылка подходит под текущие настройки и сумма доната равна или больше минимальной, трек попадает в очередь.',
          uk: 'Цей аддон потрібен для замовлення музики. Глядачі можуть донатити, вказуючи посилання на YouTube-відео в тексті донату. Якщо посилання підходить під поточні налаштування і сума донату дорівнює або більша за мінімальну, трек потрапляє в чергу.',
        },
        infoBorder: 'blue' as const,
      },
    },
    {
      key: 'enabled',
      type: 'boolean' as const,
      default: true,
      editor: {
        label: { en: 'Enabled', ru: 'Включено', uk: 'Увімкнено' },
        description: {
          en: 'Enable song request system',
          ru: 'Включить систему заказа музыки',
          uk: 'Увімкнути систему замовлення музики',
        },
      },
    },
    {
      key: 'playbackMode',
      type: 'select' as const,
      default: 'iframe',
      options: [
        {
          value: 'iframe',
          label: {
            en: 'YouTube iFrame',
            ru: 'YouTube iFrame',
            uk: 'YouTube iFrame',
          },
        },
        {
          value: 'local',
          label: {
            en: 'Download clip to PC',
            ru: 'Загрузка клипа на ПК',
            uk: 'Завантаження кліпу на ПК',
          },
        },
      ],
      editor: {
        label: {
          en: 'Playback mode',
          ru: 'Режим воспроизведения',
          uk: 'Режим відтворення',
        },
        description: {
          en: 'YouTube iFrame — play via the embedded YouTube player (default). Download clip to PC — download with yt-dlp when a track starts, then play the local file in this window (more reliable when YouTube embeds break).',
          ru: 'YouTube iFrame — воспроизведение через встроенный плеер YouTube (по умолчанию). Загрузка клипа на ПК — при старте трека файл скачивается через yt-dlp и воспроизводится локально в этом окне (надёжнее, если iframe YouTube перестаёт работать).',
          uk: 'YouTube iFrame — відтворення через вбудований плеєр YouTube (за замовчуванням). Завантаження кліпу на ПК — на старті треку файл завантажується через yt-dlp і відтворюється локально в цьому вікні (надійніше, якщо iframe YouTube перестає працювати).',
        },
      },
    },
    {
      key: 'downloadQuality',
      type: 'select' as const,
      default: 'audio',
      options: [
        {
          value: 'audio',
          label: {
            en: 'Audio only',
            ru: 'Только звук',
            uk: 'Лише звук',
          },
        },
        {
          value: 'low',
          label: {
            en: 'Low video quality',
            ru: 'Низкое качество видео',
            uk: 'Низька якість відео',
          },
        },
        {
          value: 'medium',
          label: {
            en: 'Medium video quality',
            ru: 'Среднее качество видео',
            uk: 'Середня якість відео',
          },
        },
        {
          value: 'high',
          label: {
            en: 'High video quality',
            ru: 'Высокое качество видео',
            uk: 'Висока якість відео',
          },
        },
      ],
      editor: {
        label: {
          en: 'Download quality',
          ru: 'Качество загрузки',
          uk: 'Якість завантаження',
        },
        description: {
          en: 'Used only in “Download clip to PC” mode. Files are cached as {videoId}_song.*, {videoId}_low.*, {videoId}_medium.*, or {videoId}_high.* in the addon temp folder.',
          ru: 'Только для режима «Загрузка клипа на ПК». Файлы кэшируются как {videoId}_song.*, {videoId}_low.*, {videoId}_medium.* или {videoId}_high.* во временной папке аддона.',
          uk: 'Лише для режиму «Завантаження кліпу на ПК». Файли кешуються як {videoId}_song.*, {videoId}_low.*, {videoId}_medium.* або {videoId}_high.* у тимчасовій папці аддона.',
        },
      },
    },
    {
      key: 'cost',
      type: 'number' as const,
      default: 1,
      editor: {
        label: {
          en: 'Cost per song',
          ru: 'Стоимость заказа',
          uk: 'Вартість замовлення',
        },
        description: {
          en: 'Minimum donation amount to request a song',
          ru: 'Минимальная сумма доната для заказа трека',
          uk: 'Мінімальна сума донату для замовлення треку',
        },
      },
    },
    {
      key: 'currency',
      type: 'select' as const,
      default: 'USD',
      options: currencyOptions,
      editor: {
        label: { en: 'Currency', ru: 'Валюта', uk: 'Валюта' },
        description: {
          en: 'Currency for the minimum donation amount',
          ru: 'Валюта минимальной суммы доната',
          uk: 'Валюта мінімальної суми донату',
        },
      },
    },
    {
      key: 'maxDuration',
      type: 'number' as const,
      default: 240,
      editor: {
        label: {
          en: 'Max duration (seconds)',
          ru: 'Макс. длительность (сек)',
          uk: 'Макс. тривалість (сек)',
        },
        description: {
          en: 'Maximum allowed song length in seconds (0 = no limit)',
          ru: 'Максимальная длительность трека в секундах (0 = без лимита)',
          uk: 'Максимальна тривалість треку в секундах (0 = без ліміту)',
        },
      },
    },
    {
      key: 'minViews',
      type: 'number' as const,
      default: 0,
      editor: {
        label: {
          en: 'Min views',
          ru: 'Мин. просмотров',
          uk: 'Мін. переглядів',
        },
        description: {
          en: 'Minimum view count (0 = no limit)',
          ru: 'Минимальное количество просмотров (0 = без лимита)',
          uk: 'Мінімальна кількість переглядів (0 = без ліміту)',
        },
      },
    },
    {
      key: 'minLikes',
      type: 'number' as const,
      default: 0,
      editor: {
        label: { en: 'Min likes', ru: 'Мин. лайков', uk: 'Мін. лайків' },
        description: {
          en: 'Minimum like count (0 = no limit)',
          ru: 'Минимальное количество лайков (0 = без лимита)',
          uk: 'Мінімальна кількість лайків (0 = без ліміту)',
        },
      },
    },
  ];
}

// Register synchronously-started but ordered async schema setup.
// A fire-and-forget GenerateConfig(USD) raced with the later full-list
// update and could overwrite it, leaving only USD in the select.
void registerSettings();

/**
 * Registers settings with a USD fallback, then replaces currency options
 * from `currency.getList` once available.
 * @example
 * void registerSettings();
 */
async function registerSettings(): Promise<void> {
  try {
    const list = await currency.getList();
    if (list.success && list.currencies.length) {
      const options = list.currencies.map(({ key, name }) => ({
        value: key,
        label: { en: `${name} (${key})` },
      }));
      await GenerateConfig(buildSettingsSchema(options));
      return;
    }
  } catch {}
  await GenerateConfig(buildSettingsSchema(FALLBACK_CURRENCY_OPTIONS));
}

/**
 * Normalizes a currency code from settings (trim + uppercase).
 * @param value Raw currency string from params.
 * @returns Normalized ISO-style code, or empty string when missing.
 * @example normalizeCurrencyCode(' usd ') // 'USD'
 */
function normalizeCurrencyCode(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().toUpperCase();
}

/** Playback mode from addon settings. */
type PlaybackMode = 'iframe' | 'local';

/** Local download quality preset for yt-dlp mode. */
type DownloadQuality = 'audio' | 'low' | 'medium' | 'high';

/**
 * Joins path segments under `ADDON_TMP_DIR` using the host OS separator.
 * @param parts Relative path segments inside the addon temp folder.
 * @returns Absolute path string.
 * @example
 * joinAddonTmp('dQw4w9WgXcQ_song.m4a');
 */
function joinAddonTmp(...parts: string[]): string {
  const sep = ADDON_TMP_DIR.includes('\\') ? '\\' : '/';
  return [ADDON_TMP_DIR.replace(/[/\\]+$/, ''), ...parts].join(sep);
}

/**
 * Returns the filename stem for a cached media file.
 * @param videoId YouTube video id.
 * @param quality Download quality preset.
 * @example mediaFileStem('dQw4w9WgXcQ', 'audio'); // 'dQw4w9WgXcQ_song'
 */
function mediaFileStem(videoId: string, quality: DownloadQuality): string {
  switch (quality) {
    case 'audio':
      return `${videoId}_song`;
    case 'low':
      return `${videoId}_low`;
    case 'medium':
      return `${videoId}_medium`;
    case 'high':
      return `${videoId}_high`;
  }
}

/** Candidate extensions searched when looking up a cached clip. */
const MEDIA_EXTS_BY_QUALITY: Record<DownloadQuality, string[]> = {
  audio: ['.m4a', '.mp3', '.webm', '.opus', '.aac', '.ogg'],
  low: ['.mp4', '.webm', '.mkv'],
  medium: ['.mp4', '.webm', '.mkv'],
  high: ['.mp4', '.webm', '.mkv'],
};

/**
 * yt-dlp conversion options for a download quality preset.
 * @param quality Download quality preset.
 * @example getYtDlpOptionsForQuality('audio');
 */
function getYtDlpOptionsForQuality(quality: DownloadQuality): {
  format: string;
  extractAudio?: boolean;
  audioFormat?: string;
  mergeOutputFormat?: string;
} {
  switch (quality) {
    case 'audio':
      return {
        format: 'ba/bestaudio',
        extractAudio: true,
        audioFormat: 'm4a',
      };
    case 'low':
      return {
        format: 'bv*[height' + '<=360]+ba/b[height' + '<=360]',
        mergeOutputFormat: 'mp4',
      };
    case 'medium':
      return {
        format: 'bv*[height' + '<=720]+ba/b[height' + '<=720]',
        mergeOutputFormat: 'mp4',
      };
    case 'high':
      return {
        format: 'bv*[height' + '<=1080]+ba/b[height' + '<=1080]',
        mergeOutputFormat: 'mp4',
      };
  }
}

/**
 * Reads playback mode from settings (default: iframe).
 * @param settings Addon params blob.
 * @example getPlaybackMode(currentSettings);
 */
function getPlaybackMode(settings: Record<string, unknown>): PlaybackMode {
  return settings.playbackMode === 'local' ? 'local' : 'iframe';
}

/**
 * Reads download quality from settings (default: audio).
 * @param settings Addon params blob.
 * @example getDownloadQuality(currentSettings);
 */
function getDownloadQuality(
  settings: Record<string, unknown>
): DownloadQuality {
  const value = settings.downloadQuality;
  if (
    value === 'audio' ||
    value === 'low' ||
    value === 'medium' ||
    value === 'high'
  ) {
    return value;
  }
  return 'audio';
}

/**
 * Finds an already-downloaded media file for a video id and quality.
 * @param videoId YouTube video id.
 * @param quality Download quality preset.
 * @returns Absolute file path, or `null` when missing.
 * @example
 * const path = await findCachedMedia('dQw4w9WgXcQ', 'audio');
 */
async function findCachedMedia(
  videoId: string,
  quality: DownloadQuality
): Promise<string | null> {
  const stem = mediaFileStem(videoId, quality);
  for (const ext of MEDIA_EXTS_BY_QUALITY[quality]) {
    const filePath = joinAddonTmp(`${stem}${ext}`);
    const exists = (await files.exists(filePath)) as {
      success?: boolean;
      exists?: boolean;
    };
    if (exists?.success && exists.exists) {
      return filePath;
    }
  }
  return null;
}

/** In-flight local downloads keyed by `videoId:quality`. */
const activeMediaDownloads = new Map<string, Promise<string>>();

/**
 * Ensures a local media file exists for the given video, downloading via yt-dlp when needed.
 * @param videoId YouTube video id.
 * @param quality Download quality preset.
 * @returns Absolute path to the cached file.
 * @example
 * const filePath = await ensureLocalMedia('dQw4w9WgXcQ', 'audio');
 */
async function ensureLocalMedia(
  videoId: string,
  quality: DownloadQuality
): Promise<string> {
  const cached = await findCachedMedia(videoId, quality);
  if (cached) return cached;

  const key = `${videoId}:${quality}`;
  const pending = activeMediaDownloads.get(key);
  if (pending) return pending;

  const downloadPromise = (async () => {
    const stem = mediaFileStem(videoId, quality);
    const outputPath = joinAddonTmp(`${stem}.%(ext)s`);
    const convert = getYtDlpOptionsForQuality(quality);
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const downloadId = random.id();

    console.log('[song-request][media] downloading', {
      videoId,
      quality,
      outputPath,
    });

    const result = await ytdlp.downloadFile(url, outputPath, {
      downloadId,
      ...convert,
    });

    if (!result.success) {
      throw new Error(result.message || result.error || 'Download failed');
    }

    const found = await findCachedMedia(videoId, quality);
    if (!found) {
      throw new Error('Download finished but media file was not found');
    }
    return found;
  })().finally(() => {
    activeMediaDownloads.delete(key);
  });

  activeMediaDownloads.set(key, downloadPromise);
  return downloadPromise;
}

interface SongEntry {
  id: string;
  videoId: string;
  title: string;
  duration: number;
  thumbnail: string;
  requestedBy: string;
  requestedAt: number;
  timestamp: number;
  played: boolean;
}

/**
 * Playback command pushed from dashboard attach play/stop to the application UI.
 */
type PlayAction = 'idle' | 'play' | 'stop';

interface AppState {
  queue: SongEntry[];
  currentIndex: number;
  playerHidden: boolean;
  volume: number;
  playerHeight: number;
  /**
   * Monotonic token bumped on each dashboard attach play/stop so the UI
   * can force-apply playback even when the same videoId is already loaded.
   */
  playToken: number;
  /** Latest dashboard-driven playback command for the application UI. */
  playAction: PlayAction;
}

/**
 * Returns a fresh default application state.
 * @returns Default `AppState`.
 * @example getDefaultState();
 */
function getDefaultState(): AppState {
  return {
    queue: [],
    currentIndex: -1,
    playerHidden: false,
    volume: 50,
    playerHeight: 360,
    playToken: 0,
    playAction: 'idle',
  };
}

function parseTimestamp(str: string): number {
  const match = str.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
  if (!match) return parseInt(str) || 0;
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  return hours * 3600 + minutes * 60 + seconds;
}

function formatDurationShort(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * Decodes common HTML entities in donation/message text (e.g. `&amp;` → `&`).
 * Donation platforms often HTML-escape URLs before they reach the addon.
 * @param text Raw text that may contain HTML entities.
 * @returns Text with entities decoded.
 * @example decodeHtmlEntities('v=abc&amp;list=RD') // 'v=abc&list=RD'
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCharCode(parseInt(code, 10))
    )
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCharCode(parseInt(hex, 16))
    );
}

/**
 * Extracts a YouTube video id and optional start timestamp from free text.
 * Supports watch / shorts / embed / live / youtu.be links, including URLs
 * whose `&` separators were HTML-escaped as `&amp;` by donation platforms.
 * @param text Message or URL string to scan.
 * @returns Video id and start seconds, or `null` if no valid link is found.
 * @example parseYouTubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&amp;t=30')
 */
function parseYouTubeUrl(
  text: string
): { videoId: string; timestamp: number } | null {
  const decoded = decodeHtmlEntities(text);

  let videoId: string | null = null;

  const shortMatch = decoded.match(
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/i
  );
  if (shortMatch) {
    videoId = shortMatch[1];
  }

  if (!videoId) {
    const pathMatch = decoded.match(
      /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/(?:shorts|embed|live)\/([a-zA-Z0-9_-]{11})/i
    );
    if (pathMatch) videoId = pathMatch[1];
  }

  if (!videoId) {
    const watchMatch = decoded.match(
      /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/watch\?[^\s<>"']+/i
    );
    if (watchMatch) {
      const vMatch = watchMatch[0].match(/[?&]v=([a-zA-Z0-9_-]{11})/i);
      if (vMatch) videoId = vMatch[1];
    }
  }

  if (!videoId) return null;

  const tMatch = decoded.match(/[?&]t=(\d+[smh]?\d*[smh]?)/i);
  const timestamp = tMatch ? parseTimestamp(tMatch[1]) : 0;
  return { videoId, timestamp };
}

/**
 * Extracts a balanced JSON object starting at `start` within `text`.
 * @param text Source string containing JSON.
 * @param start Index of the opening `{`.
 * @returns Parsed object, or `null` on failure.
 * @example extractBalancedJson('x={"a":1};', 2)
 */
function extractBalancedJson(text: string, start: number): unknown | null {
  if (start < 0 || text[start] !== '{') return null;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(text.slice(start, i + 1));
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

/**
 * Tries to read `videoDetails` from a YouTube watch-page HTML payload.
 * @param html Watch page HTML.
 * @returns `videoDetails` object when present, otherwise `null`.
 * @example extractPlayerVideoDetails(html)?.lengthSeconds
 */
function extractPlayerVideoDetails(html: string): {
  title?: string;
  lengthSeconds?: string;
  viewCount?: string;
  thumbnail?: { thumbnails?: Array<{ url?: string }> };
} | null {
  const marker = 'ytInitialPlayerResponse';
  const markerIdx = html.indexOf(marker);
  if (markerIdx === -1) return null;
  const eqIdx = html.indexOf('=', markerIdx + marker.length);
  if (eqIdx === -1) return null;
  let start = eqIdx + 1;
  while (start < html.length && /\s/.test(html[start])) start++;
  const data = extractBalancedJson(html, start) as {
    videoDetails?: {
      title?: string;
      lengthSeconds?: string;
      viewCount?: string;
      thumbnail?: { thumbnails?: Array<{ url?: string }> };
    };
    playabilityStatus?: { status?: string; reason?: string };
  } | null;
  if (!data) return null;
  if (!data.videoDetails) {
    console.log('[song-request][getVideoInfo] player has no videoDetails', {
      status: data.playabilityStatus?.status,
      reason: data.playabilityStatus?.reason,
    });
    return null;
  }
  return data.videoDetails;
}

/**
 * Fetches YouTube video metadata (title, duration, views, thumbnail).
 * Uses oEmbed for title/thumbnail (reliable when watch-page scrape is
 * bot-blocked with LOGIN_REQUIRED), then optionally enriches duration/views
 * from the watch HTML when `videoDetails` is present.
 * @param videoId 11-char YouTube video id.
 * @returns Metadata, or `null` when the video cannot be resolved via oEmbed.
 * @example const info = await getVideoInfo('dQw4w9WgXcQ');
 */
async function getVideoInfo(videoId: string): Promise<{
  title: string;
  duration: number;
  viewCount: number;
  thumbnail: string;
  /** False when duration/views could not be read (bot-blocked watch page). */
  statsKnown: boolean;
} | null> {
  const log = (...args: unknown[]) =>
    console.log('[song-request][getVideoInfo]', ...args);

  const headers = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
  };

  let title = 'Unknown';
  let thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  let duration = 0;
  let viewCount = 0;
  let statsKnown = false;

  try {
    const oembedUrl =
      'https://www.youtube.com/oembed?url=' +
      encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`) +
      '&format=json';
    const oembedRaw = await network.request.get(oembedUrl, {
      ...headers,
      Accept: 'application/json',
    });
    log('oembed', {
      length: typeof oembedRaw === 'string' ? oembedRaw.length : -1,
      preview: String(oembedRaw).slice(0, 160),
    });
    const oembed = JSON.parse(oembedRaw);
    if (!oembed || typeof oembed.title !== 'string') {
      log('oembed missing title', oembed);
      return null;
    }
    title = oembed.title;
    if (typeof oembed.thumbnail_url === 'string') {
      thumbnail = oembed.thumbnail_url;
    }
  } catch (err) {
    log('oembed failed', err);
    return null;
  }

  try {
    const html = await network.request.get(
      `https://www.youtube.com/watch?v=${videoId}`,
      headers
    );
    log('watch html', {
      length: typeof html === 'string' ? html.length : -1,
      hasPlayer:
        typeof html === 'string' && html.includes('ytInitialPlayerResponse'),
    });
    const details =
      typeof html === 'string' ? extractPlayerVideoDetails(html) : null;
    if (details) {
      duration = parseInt(details.lengthSeconds || '0', 10) || 0;
      viewCount = parseInt(details.viewCount || '0', 10) || 0;
      statsKnown = true;
      if (details.title) title = details.title;
      const thumbs = details.thumbnail?.thumbnails;
      if (thumbs?.length) {
        thumbnail = thumbs[thumbs.length - 1]?.url || thumbnail;
      }
      log('enriched from player', {
        duration,
        viewCount,
        title: title.slice(0, 80),
      });
    } else {
      log('using oembed-only metadata (duration/views unavailable)');
    }
  } catch (err) {
    log('watch scrape failed; keeping oembed metadata', err);
  }

  return { title, duration, viewCount, thumbnail, statsKnown };
}

let currentState: AppState = getDefaultState();
let currentSettings: any = {};

async function loadSettings() {
  try {
    currentSettings = await api.config.getParams<any>();
  } catch {
    currentSettings = {};
  }
}

function saveState() {
  storage.Write(currentState);
}

async function init() {
  await loadSettings();

  const saved = storage.Read<AppState>();
  if (saved) {
    currentState = { ...getDefaultState(), ...saved };
  }

  // Set status
  try {
    status.Update({
      current: 'online',
      message: {
        en: 'Song Request active',
        ru: 'Заказ музыки активен',
        uk: 'Замовлення музики активне',
      },
    });
  } catch {}

  network.endpoints.create('state', 'GET', 'onGetState');
  network.endpoints.create('queue', 'POST', 'onUpdateQueue');
  network.endpoints.create('player', 'POST', 'onUpdatePlayer');
  network.endpoints.create('validate-url', 'POST', 'onValidateUrl');
  network.endpoints.create('manual-add', 'POST', 'onManualAdd');
  network.endpoints.create('prepare-media', 'POST', 'onPrepareMedia');
  network.endpoints.create('media', 'GET', 'onMedia');

  try {
    await dashboard.registerAttaches([
      { type: 'song', label: { en: 'Song', ru: 'Трек', uk: 'Трек' } },
    ]);
  } catch {}

  console.log('[song-request] init complete, listening for dashboard records', {
    enabled: currentSettings.enabled,
    cost: currentSettings.cost,
    currency: currentSettings.currency,
  });

  dashboard.onAttachPlay(async payload => {
    if (payload.type !== 'song') return;

    const entryIdx = currentState.queue.findIndex(e => e.id === payload.id);
    if (entryIdx === -1) return;

    const entry = currentState.queue[entryIdx];
    const isCurrent = currentState.currentIndex === entryIdx;
    // Stuck `playing: true` sends `stop` even when nothing is current — treat as play.
    const shouldStop = payload.action === 'stop' && isCurrent;

    if (shouldStop) {
      currentState.playAction = 'stop';
      currentState.playToken += 1;
      saveState();
      try {
        await dashboard.updateRecordAttaches(
          payload.recordId,
          [
            {
              type: 'song',
              value: entry.title,
              id: payload.id,
              playable: true,
              playing: false,
            },
          ],
          { mode: 'merge' }
        );
      } catch {}
      return;
    }

    entry.played = false;
    currentState.currentIndex = entryIdx;
    currentState.playAction = 'play';
    currentState.playToken += 1;
    saveState();
    try {
      await dashboard.updateRecordAttaches(
        payload.recordId,
        [
          {
            type: 'song',
            value: entry.title,
            id: payload.id,
            playable: true,
            playing: true,
          },
        ],
        { mode: 'merge' }
      );
    } catch {}
  });

  events.On('onGetState', async ({ query }) => {
    if (query?.token !== data.token) {
      return { success: false, message: 'Unauthorized' };
    }
    await loadSettings();
    return {
      success: true,
      state: currentState,
      settings: {
        ...currentSettings,
        playbackMode: getPlaybackMode(currentSettings),
        downloadQuality: getDownloadQuality(currentSettings),
      },
      lang: LANG.current,
    };
  });

  events.On('onPrepareMedia', async ({ query, body }) => {
    if (query?.token !== data.token) {
      return { success: false, message: 'Unauthorized' };
    }
    await loadSettings();
    if (getPlaybackMode(currentSettings) !== 'local') {
      return { success: false, message: 'Local playback mode is not enabled' };
    }
    const videoId =
      typeof body?.videoId === 'string' ? body.videoId.trim() : '';
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return { success: false, message: 'Invalid video id' };
    }
    const quality = getDownloadQuality(currentSettings);
    try {
      const filePath = await ensureLocalMedia(videoId, quality);
      const fileName = filePath.split(/[/\\]/).pop() || '';
      return {
        success: true,
        videoId,
        quality,
        fileName,
        mediaKind: quality === 'audio' ? 'audio' : 'video',
      };
    } catch (err) {
      console.error('[song-request][media] prepare failed', err);
      return {
        success: false,
        message: err instanceof Error ? err.message : 'Download failed',
      };
    }
  });

  events.On('onMedia', async ({ query }) => {
    if (query?.token !== data.token) {
      return { success: false, message: 'Unauthorized' };
    }
    await loadSettings();
    const videoId =
      typeof query?.videoId === 'string' ? String(query.videoId).trim() : '';
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return { success: false, message: 'Invalid video id' };
    }
    const quality = getDownloadQuality(currentSettings);
    const filePath = await findCachedMedia(videoId, quality);
    if (!filePath) {
      return { success: false, message: 'Media file not found' };
    }
    return { file: filePath };
  });

  events.On('onUpdateQueue', ({ body }) => {
    if (!body) return { success: false, message: 'No body' };
    if (body.queue) {
      currentState.queue = body.queue;
    }
    if (typeof body.currentIndex === 'number') {
      currentState.currentIndex = body.currentIndex;
    }
    saveState();
    return { success: true, state: currentState };
  });

  events.On('onUpdatePlayer', ({ body }) => {
    if (!body) return { success: false, message: 'No body' };
    if (typeof body.playerHidden === 'boolean') {
      currentState.playerHidden = body.playerHidden;
    }
    if (typeof body.volume === 'number') {
      currentState.volume = body.volume;
    }
    if (typeof body.currentIndex === 'number') {
      currentState.currentIndex = body.currentIndex;
    }
    if (typeof body.playerHeight === 'number') {
      currentState.playerHeight = body.playerHeight;
    }
    saveState();
    return { success: true, state: currentState };
  });

  events.On('onValidateUrl', async ({ body }) => {
    if (!body?.url) return { success: false, message: 'No URL provided' };
    const parsed = parseYouTubeUrl(body.url);
    if (!parsed) return { success: false, message: 'Invalid YouTube URL' };
    const info = await getVideoInfo(parsed.videoId);
    if (!info) return { success: false, message: 'Could not fetch video info' };

    const errors: string[] = [];
    const maxDuration = currentSettings.maxDuration || 0;
    const effectiveDuration = info.duration - parsed.timestamp;
    if (info.statsKnown && maxDuration > 0 && effectiveDuration > maxDuration) {
      errors.push(
        `Duration ${formatDurationShort(effectiveDuration)} exceeds max ${formatDurationShort(maxDuration)}`
      );
    }
    const minViews = currentSettings.minViews || 0;
    if (info.statsKnown && minViews > 0 && info.viewCount < minViews) {
      errors.push(
        `Views ${info.viewCount.toLocaleString()} below minimum ${minViews.toLocaleString()}`
      );
    }

    return {
      success: true,
      videoId: parsed.videoId,
      info,
      timestamp: parsed.timestamp,
      errors,
    };
  });

  events.On('onManualAdd', async ({ body }) => {
    if (!body?.url) return { success: false, message: 'No URL provided' };
    const parsed = parseYouTubeUrl(body.url);
    if (!parsed) return { success: false, message: 'Invalid YouTube URL' };

    const info = body.info || (await getVideoInfo(parsed.videoId));
    if (!info) return { success: false, message: 'Could not fetch video info' };

    const entry: SongEntry = {
      id: random.id(),
      videoId: parsed.videoId,
      title: info.title,
      duration: info.duration,
      thumbnail: info.thumbnail,
      requestedBy: body.requestedBy || 'Manual',
      requestedAt: Date.now(),
      timestamp: parsed.timestamp,
      played: false,
    };

    currentState.queue.push(entry);
    if (currentState.currentIndex === -1) {
      const firstUnplayed = currentState.queue.findIndex(i => !i.played);
      currentState.currentIndex =
        firstUnplayed !== -1 ? firstUnplayed : currentState.queue.length - 1;
    }
    saveState();
    return { success: true, state: currentState };
  });

  dashboard.onRecord(async payload => {
    const log = (...args: unknown[]) =>
      console.log('[song-request][donation]', ...args);

    log('record received', {
      id: payload.id,
      type: payload.record?.type,
      from: payload.record?.from,
      amount: payload.record?.amount,
      sourceAddonId: (payload as any).sourceAddonId,
      user: payload.user?.name,
      messageType: typeof payload.record?.message,
      message: payload.record?.message,
      enabled: currentSettings.enabled,
      settings: {
        cost: currentSettings.cost,
        currency: currentSettings.currency,
        maxDuration: currentSettings.maxDuration,
        minViews: currentSettings.minViews,
      },
    });

    if (payload.record.type !== 'donation') {
      log('skip: not a donation', payload.record.type);
      return;
    }
    if (!currentSettings.enabled) {
      log('skip: addon disabled in settings');
      return;
    }

    const message = payload.record.message;
    const text =
      typeof message === 'string'
        ? message
        : (message as any)?.en ||
          (message as any)?.ru ||
          (message as any)?.uk ||
          '';

    log('message extracted', {
      text,
      textLength: text.length,
      decodedPreview: decodeHtmlEntities(text).slice(0, 300),
    });

    const parsed = parseYouTubeUrl(text);
    if (!parsed) {
      log('skip: no YouTube URL found in message');
      return;
    }
    log('url parsed', parsed);

    const amount = payload.record.amount;
    if (!amount || amount.length < 2) {
      log('skip: amount missing or incomplete', amount);
      return;
    }

    const [donationAmount, donationCurrency] = amount;

    const costValue = currentSettings.cost || 1;
    const costCurrency =
      normalizeCurrencyCode(currentSettings.currency) || 'USD';
    const fromCurrency = normalizeCurrencyCode(donationCurrency);

    log('amount check', {
      donationAmount,
      donationCurrency: fromCurrency,
      costValue,
      costCurrency,
    });

    if (fromCurrency !== costCurrency) {
      const converted = await currency.convert(
        donationAmount,
        fromCurrency as any,
        costCurrency as any
      );
      log('currency converted', converted);
      if (!converted.success || converted.amount < costValue) {
        log('skip: converted amount below cost', {
          converted,
          costValue,
        });
        return;
      }
    } else if (donationAmount < costValue) {
      log('skip: amount below cost', { donationAmount, costValue });
      return;
    }

    log('fetching video info', parsed.videoId);
    const info = await getVideoInfo(parsed.videoId);
    if (!info) {
      log('skip: getVideoInfo returned null', parsed.videoId);
      return;
    }
    log('video info', {
      title: info.title,
      duration: info.duration,
      viewCount: info.viewCount,
      statsKnown: info.statsKnown,
    });

    const maxDuration = currentSettings.maxDuration || 0;
    const effectiveDuration = info.duration - parsed.timestamp;
    if (info.statsKnown && maxDuration > 0 && effectiveDuration > maxDuration) {
      log('skip: duration exceeds max', {
        effectiveDuration,
        maxDuration,
      });
      return;
    }
    if (!info.statsKnown && maxDuration > 0) {
      log(
        'warn: maxDuration set but duration unknown; skipping duration filter'
      );
    }

    const minViews = currentSettings.minViews || 0;
    if (info.statsKnown && minViews > 0 && info.viewCount < minViews) {
      log('skip: views below minimum', {
        viewCount: info.viewCount,
        minViews,
      });
      return;
    }
    if (!info.statsKnown && minViews > 0) {
      log('warn: minViews set but viewCount unknown; skipping views filter');
    }

    const entry: SongEntry = {
      id: random.id(),
      videoId: parsed.videoId,
      title: info.title,
      duration: info.duration,
      thumbnail: info.thumbnail,
      requestedBy: payload.user?.name || payload.record.from || 'Anonymous',
      requestedAt: Date.now(),
      timestamp: parsed.timestamp,
      played: false,
    };

    currentState.queue.push(entry);
    if (currentState.currentIndex === -1) {
      const firstUnplayed = currentState.queue.findIndex(i => !i.played);
      currentState.currentIndex =
        firstUnplayed !== -1 ? firstUnplayed : currentState.queue.length - 1;
    }
    saveState();
    log('queued', {
      entryId: entry.id,
      videoId: entry.videoId,
      title: entry.title,
      queueLength: currentState.queue.length,
      currentIndex: currentState.currentIndex,
    });

    try {
      await dashboard.updateRecordAttaches(
        payload.id,
        [{ type: 'song', value: entry.title, id: entry.id, playable: true }],
        { mode: 'merge' }
      );
      log('attach updated on donation record');
    } catch (err) {
      log('attach update failed', err);
    }
  });
}

init();
