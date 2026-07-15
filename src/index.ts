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

interface AppState {
  queue: SongEntry[];
  currentIndex: number;
  playerHidden: boolean;
  volume: number;
  playerHeight: number;
}

function getDefaultState(): AppState {
  return {
    queue: [],
    currentIndex: -1,
    playerHidden: false,
    volume: 50,
    playerHeight: 360,
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

function parseYouTubeUrl(
  text: string
): { videoId: string; timestamp: number } | null {
  const regex =
    /(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&]t=(\d+[smh]?\d*[smh]?))?/i;
  const match = text.match(regex);
  if (!match) return null;
  const videoId = match[1];
  const timestamp = match[2] ? parseTimestamp(match[2]) : 0;
  return { videoId, timestamp };
}

async function getVideoInfo(videoId: string): Promise<{
  title: string;
  duration: number;
  viewCount: number;
  thumbnail: string;
} | null> {
  try {
    const html = await network.request.get(
      `https://www.youtube.com/watch?v=${videoId}`
    );
    const jsonMatch = html.match(
      /ytInitialPlayerResponse\s*=\s*({[\s\S]*?});\s*<\//
    );
    if (!jsonMatch) return null;
    const data = JSON.parse(jsonMatch[1]);
    const details = data.videoDetails;
    if (!details) return null;
    const thumbnails = details.thumbnail?.thumbnails;
    const thumbnail = thumbnails?.[thumbnails.length - 1]?.url || '';
    return {
      title: details.title || 'Unknown',
      duration: parseInt(details.lengthSeconds) || 0,
      viewCount: parseInt(details.viewCount) || 0,
      thumbnail,
    };
  } catch {
    return null;
  }
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

  try {
    await dashboard.registerAttaches([
      { type: 'song', label: { en: 'Song', ru: 'Трек', uk: 'Трек' } },
    ]);
  } catch {}

  dashboard.onAttachPlay(async payload => {
    if (payload.type !== 'song') return;
    if (payload.action !== 'play') return;
    const entryIdx = currentState.queue.findIndex(e => e.id === payload.id);
    if (entryIdx === -1) return;
    currentState.queue[entryIdx].played = false;
    currentState.currentIndex = entryIdx;
    saveState();
    try {
      await dashboard.updateRecordAttaches(
        payload.recordId,
        [
          {
            type: 'song',
            value: currentState.queue[entryIdx].title,
            id: payload.id,
            playable: true,
          },
        ],
        { mode: 'merge' }
      );
    } catch {}
  });

  events.On('onGetState', async () => {
    await loadSettings();
    return {
      success: true,
      state: currentState,
      settings: currentSettings,
      lang: LANG.current,
    };
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
    if (maxDuration > 0 && effectiveDuration > maxDuration) {
      errors.push(
        `Duration ${formatDurationShort(effectiveDuration)} exceeds max ${formatDurationShort(maxDuration)}`
      );
    }
    const minViews = currentSettings.minViews || 0;
    if (minViews > 0 && info.viewCount < minViews) {
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
    if (payload.record.type !== 'donation') return;
    if (!currentSettings.enabled) return;

    const message = payload.record.message;
    const text =
      typeof message === 'string' ? message : (message as any)?.en || '';

    const parsed = parseYouTubeUrl(text);
    if (!parsed) return;

    const amount = payload.record.amount;
    if (!amount || amount.length < 2) return;

    const [donationAmount, donationCurrency] = amount;

    const costValue = currentSettings.cost || 1;
    const costCurrency =
      normalizeCurrencyCode(currentSettings.currency) || 'USD';
    const fromCurrency = normalizeCurrencyCode(donationCurrency);

    if (fromCurrency !== costCurrency) {
      const converted = await currency.convert(
        donationAmount,
        fromCurrency as any,
        costCurrency as any
      );
      if (!converted.success || converted.amount < costValue) return;
    } else if (donationAmount < costValue) {
      return;
    }

    const info = await getVideoInfo(parsed.videoId);
    if (!info) return;

    const maxDuration = currentSettings.maxDuration || 0;
    const effectiveDuration = info.duration - parsed.timestamp;
    if (maxDuration > 0 && effectiveDuration > maxDuration) return;

    const minViews = currentSettings.minViews || 0;
    if (minViews > 0 && info.viewCount < minViews) return;

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

    try {
      await dashboard.updateRecordAttaches(
        payload.id,
        [{ type: 'song', value: entry.title, id: entry.id, playable: true }],
        { mode: 'merge' }
      );
    } catch {}
  });
}

init();
