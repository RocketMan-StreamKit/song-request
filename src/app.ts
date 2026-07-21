type Locale = 'en' | 'ru' | 'uk';

declare const YT: any;
declare function onYouTubeIframeAPIReady(): void;

const LOCALE: Record<string, Locale> = { en: 'en', ru: 'ru', uk: 'uk' };

const T = {
  en: {
    queue: 'Order History',
    songs: (n: number) => `${n} song${n !== 1 ? 's' : ''}`,
    noSong: 'No song playing',
    queueEmpty:
      'No song history yet. Songs requested via donations will appear here.',
    playerHidden: 'Player hidden — click to show',
    hidePlayer: 'Hide player',
    showPlayer: 'Show player',
    prev: 'Previous',
    playPause: 'Play/Pause',
    skip: 'Skip',
    quality: 'Quality',
    volume: 'Volume',
    remove: 'Remove',
    addToQueue: 'Add to queue',
    removeFromQueue: 'Remove from queue',
    requestedBy: 'requested by',
    justNow: 'just now',
    mAgo: (n: number) => `${n}m ago`,
    hAgo: (n: number) => `${n}h ago`,
    dAgo: (n: number) => `${n}d ago`,
    startAt: 'Start at',
    nowPlaying: (title: string, name: string) =>
      `${title} — requested by ${name}`,
    auto: 'Auto',
    addTitle: 'Add song',
    addPlaceholder: 'Paste YouTube URL...',
    addButton: 'Add',
    addFetching: 'Fetching...',
    restrictionsTitle: 'Restrictions',
    addAnyway: 'Add anyway',
    cancel: 'Cancel',
    views: 'views',
    duration: 'Duration',
    added: 'Added to queue',
    invalidUrl: 'Invalid YouTube URL',
    fetchFailed: 'Could not fetch video info',
    addError: 'Failed to add song',
    downloading: 'Downloading…',
    downloadFailed: 'Failed to download clip',
    localAudio: 'Audio',
  },
  ru: {
    queue: 'История заказов',
    songs: (n: number) => `${n} ${pluralize(n, ['песня', 'песни', 'песен'])}`,
    noSong: 'Нет треков',
    queueEmpty: 'Очередь пуста. Заказанные через донаты треки появятся здесь.',
    playerHidden: 'Плеер скрыт — нажмите чтобы показать',
    hidePlayer: 'Скрыть плеер',
    showPlayer: 'Показать плеер',
    prev: 'Назад',
    playPause: 'Играть/Пауза',
    skip: 'Далее',
    quality: 'Качество',
    volume: 'Громкость',
    remove: 'Удалить',
    addToQueue: 'В очередь',
    removeFromQueue: 'Из очереди',
    requestedBy: 'заказал(а)',
    justNow: 'только что',
    mAgo: (n: number) => `${n} мин. назад`,
    hAgo: (n: number) => `${n} ч. назад`,
    dAgo: (n: number) => `${n} д. назад`,
    startAt: 'С',
    nowPlaying: (title: string, name: string) =>
      `${title} — заказал(а) ${name}`,
    auto: 'Авто',
    addTitle: 'Добавить трек',
    addPlaceholder: 'Вставьте ссылку YouTube...',
    addButton: 'Добавить',
    addFetching: 'Загрузка...',
    restrictionsTitle: 'Ограничения',
    addAnyway: 'Всё равно добавить',
    cancel: 'Отмена',
    views: 'просмотров',
    duration: 'Длительность',
    added: 'Добавлено в очередь',
    invalidUrl: 'Неверная ссылка YouTube',
    fetchFailed: 'Не удалось получить информацию о видео',
    addError: 'Ошибка при добавлении',
    downloading: 'Загрузка…',
    downloadFailed: 'Не удалось скачать клип',
    localAudio: 'Аудио',
  },
  uk: {
    queue: 'Історія замовлень',
    songs: (n: number) => `${n} ${pluralize(n, ['пісня', 'пісні', 'пісень'])}`,
    noSong: 'Немає треків',
    queueEmpty:
      "Історія замовлень порожня. Замовлені через донати треки з'являться тут.",
    playerHidden: 'Плеєр приховано — натисніть щоб показати',
    hidePlayer: 'Приховати плеєр',
    showPlayer: 'Показати плеєр',
    prev: 'Назад',
    playPause: 'Грати/Пауза',
    skip: 'Далі',
    quality: 'Якість',
    volume: 'Гучність',
    remove: 'Видалити',
    addToQueue: 'У чергу',
    removeFromQueue: 'З черги',
    requestedBy: 'замовив(ла)',
    justNow: 'щойно',
    mAgo: (n: number) => `${n} хв. тому`,
    hAgo: (n: number) => `${n} год. тому`,
    dAgo: (n: number) => `${n} д. тому`,
    startAt: 'З',
    nowPlaying: (title: string, name: string) =>
      `${title} — замовив(ла) ${name}`,
    auto: 'Авто',
    addTitle: 'Додати трек',
    addPlaceholder: 'Вставте посилання YouTube...',
    addButton: 'Додати',
    addFetching: 'Завантаження...',
    restrictionsTitle: 'Обмеження',
    addAnyway: 'Все одно додати',
    cancel: 'Скасувати',
    views: 'переглядів',
    duration: 'Тривалість',
    added: 'Додано до черги',
    invalidUrl: 'Невірне посилання YouTube',
    fetchFailed: 'Не вдалося отримати інформацію про відео',
    addError: 'Помилка при додаванні',
    downloading: 'Завантаження…',
    downloadFailed: 'Не вдалося завантажити кліп',
    localAudio: 'Аудіо',
  },
};

function pluralize(n: number, forms: [string, string, string]): string {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}

let lang: Locale = 'en';

function t(key: string, ...args: any[]): string {
  const dict = (T as any)[lang] || T.en;
  const val = dict[key];
  if (typeof val === 'function') return val(...args);
  return val ?? key;
}

/**
 * Queue entry for a requested YouTube track.
 */
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

/**
 * Application UI state mirrored from the worker.
 */
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

/** Playback mode mirrored from addon settings. */
type PlaybackMode = 'iframe' | 'local';

/** Local download quality mirrored from addon settings. */
type DownloadQuality = 'audio' | 'low' | 'medium' | 'high';

/** Addon settings subset used by the application UI. */
type AppSettings = {
  playbackMode: PlaybackMode;
  downloadQuality: DownloadQuality;
};

/** Current mirrored worker state for the application UI. */
let state: AppState = {
  queue: [],
  currentIndex: -1,
  playerHidden: false,
  volume: 50,
  playerHeight: 360,
  playToken: 0,
  playAction: 'idle',
};
/** Mirrored settings that affect the player (mode / download quality). */
let appSettings: AppSettings = {
  playbackMode: 'iframe',
  downloadQuality: 'audio',
};
/** YouTube IFrame player instance, or null before create/after destroy. */
let player: any = null;
/** HTML5 media element used in local download mode. */
let localPlayer: HTMLVideoElement | null = null;
/** Whether a local-media prepare/download is in flight. */
let preparingMedia = false;
/** Video id currently loaded in the local player element. */
let localLoadedVideoId: string | null = null;
/** Whether the player reports an active playing state. */
let isPlaying = false;
/** Whether the YouTube player `onReady` callback has fired. */
let playerReady = false;
/** Interval id for polling worker state, or null when stopped. */
let pollTimer: number | null = null;
/** Interval id for seek bar updates, or null when stopped. */
let seekTimer: number | null = null;
/** Queue row currently being dragged, if any. */
let dragItem: HTMLElement | null = null;
/** Whether the YouTube IFrame API script has finished loading. */
let youtubeApiReady = false;
/** Whether the user is actively scrubbing the seek bar. */
let seeking = false;
/** Selected YouTube playback quality id from the quality select. */
let selectedQuality: string = 'default';
/** Pending manual add awaiting restriction confirmation, if any. */
let pendingAdd: { url: string; info: any } | null = null;
/** Last rendered queue key used to skip redundant DOM rebuilds. */
let lastRenderKey = '';
/** Last applied `playToken` from worker state (dashboard attach play/stop). */
let lastPlayToken = 0;

const API_BASE = `http://localhost:${window.location.port}/addon/song-request`;

function getToken(): string {
  return new URLSearchParams(window.location.search).get('token') || '';
}

async function apiGet(path: string): Promise<any> {
  const res = await fetch(
    `${API_BASE}${path}?token=${encodeURIComponent(getToken())}`
  );
  return res.json();
}

async function apiPost(path: string, body: any): Promise<any> {
  const res = await fetch(
    `${API_BASE}${path}?token=${encodeURIComponent(getToken())}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  return res.json();
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0)
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function formatDurationShort(seconds: number): string {
  if (seconds >= 3600) return formatDuration(seconds);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function setNowPlaying(text: string) {
  const el = document.getElementById('now-playing-text');
  if (el) el.textContent = text;
}

function updateQueueCount() {
  const el = document.getElementById('queue-count');
  if (el) {
    el.textContent = t('songs', state.queue.length);
  }
}

function formatTimeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return t('justNow');
  if (mins < 60) return t('mAgo', mins);
  const hours = Math.floor(mins / 60);
  if (hours < 24) return t('hAgo', hours);
  return t('dAgo', Math.floor(hours / 24));
}

function formatNumber(n: number): string {
  const locMap: Record<string, string> = {
    en: 'en-US',
    ru: 'ru-RU',
    uk: 'uk-UA',
  };
  return n.toLocaleString(locMap[lang] || 'en-US');
}

function applyPlayerHeight() {
  const pc = document.getElementById('player-container');
  if (pc && state.playerHeight) {
    pc.style.height = `${state.playerHeight}px`;
    pc.style.maxHeight = `${state.playerHeight}px`;
    pc.style.aspectRatio = 'unset';
  }
  applyPlaybackQuality();
}

async function loadState() {
  try {
    const data = await apiGet('/state');
    if (data.success) {
      state = {
        queue: [],
        currentIndex: -1,
        playerHidden: false,
        volume: 50,
        playerHeight: 360,
        playToken: 0,
        playAction: 'idle',
        ...data.state,
      };
      const nextMode =
        data.settings?.playbackMode === 'local' ? 'local' : 'iframe';
      const nextQuality =
        data.settings?.downloadQuality === 'low' ||
        data.settings?.downloadQuality === 'medium' ||
        data.settings?.downloadQuality === 'high' ||
        data.settings?.downloadQuality === 'audio'
          ? data.settings.downloadQuality
          : 'audio';
      const modeChanged = nextMode !== appSettings.playbackMode;
      appSettings = {
        playbackMode: nextMode,
        downloadQuality: nextQuality,
      };
      if (data.lang && LOCALE[data.lang]) {
        lang = LOCALE[data.lang];
      }
      updateUI();
      updateStaticText();
      applyPlayerHeight();
      applyPlaybackModeUi();
      if (modeChanged) {
        void switchPlaybackMode(nextMode);
      }
    }
  } catch (err) {
    console.error('Failed to load state:', err);
  }
}

function updateStaticText() {
  const titleEl = document.getElementById('queue-title');
  if (titleEl) titleEl.textContent = t('queue');
  const emptyEl = document.getElementById('queue-empty');
  if (emptyEl) {
    const p = emptyEl.querySelector('p');
    if (p) p.textContent = t('queueEmpty');
  }
  const btnHide = document.getElementById('btn-hide-player');
  if (btnHide) {
    btnHide.title = state.playerHidden ? t('showPlayer') : t('hidePlayer');
    btnHide.textContent = state.playerHidden ? '👁' : '👁';
  }
  const btnPrev = document.getElementById('btn-prev');
  if (btnPrev) btnPrev.title = t('prev');
  const btnPP = document.getElementById('btn-play-pause');
  if (btnPP) btnPP.title = t('playPause');
  const btnSkip = document.getElementById('btn-skip');
  if (btnSkip) btnSkip.title = t('skip');
  const qs = document.getElementById('quality-select');
  if (qs) qs.title = t('quality');
  const qsOptions = qs?.querySelectorAll('option');
  if (qsOptions) {
    for (const opt of qsOptions) {
      if (opt.value === 'default') opt.textContent = t('auto');
    }
  }
  const volLabel = document.querySelector('.vol-icon');
  if (volLabel) (volLabel as HTMLElement).title = t('volume');
  const addInput = document.getElementById('add-input') as HTMLInputElement;
  if (addInput) addInput.placeholder = t('addPlaceholder');
  const addBtn = document.getElementById('btn-add');
  if (addBtn) addBtn.textContent = t('addButton');
  const modalTitle = document.getElementById('modal-title');
  if (modalTitle) {
    if (pendingAdd) {
      modalTitle.textContent = t('restrictionsTitle');
    } else {
      modalTitle.textContent = t('addTitle');
    }
  }
}

function updateUI() {
  renderQueue();
  updatePlayerState();
  updateQueueCount();
  updatePlayerVisibility();
  if (state.currentIndex === -1 || !state.queue.length) {
    autoHidePlayer();
  }
}

function renderQueue() {
  const list = document.getElementById('queue-list');
  const empty = document.getElementById('queue-empty');
  if (!list) return;

  const renderKey = JSON.stringify({ q: state.queue, ci: state.currentIndex });
  if (renderKey === lastRenderKey) return;
  lastRenderKey = renderKey;

  if (state.queue.length === 0) {
    list.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    setNowPlaying(t('noSong'));
    return;
  }

  if (empty) empty.classList.add('hidden');

  const reversed = [...state.queue].reverse();
  list.innerHTML = reversed
    .map((item, ri) => {
      const originalIndex = state.queue.length - 1 - ri;
      const isPlaying = originalIndex === state.currentIndex;
      const thumb =
        item.thumbnail || `https://i.ytimg.com/vi/${item.videoId}/default.jpg`;
      const duration = formatDurationShort(item.duration);
      const timestampStr =
        item.timestamp > 0
          ? `${t('startAt')} ${formatDurationShort(item.timestamp)}`
          : '';
      const isPlayed = item.played;
      return `
        <li class="queue-item ${isPlaying ? 'playing' : ''} ${isPlayed ? 'played' : ''}" data-index="${originalIndex}" draggable="true">
          <img class="queue-item-thumb" src="${thumb}" alt="" loading="lazy" />
          <div class="queue-item-info">
            <div class="queue-item-title">${escapeHtml(item.title)}</div>
            <div class="queue-item-meta">
              <span>${escapeHtml(item.requestedBy)}</span>
              <span>${formatTimeAgo(item.requestedAt)}</span>
              ${timestampStr ? `<span>${timestampStr}</span>` : ''}
              ${isPlayed ? `<span class="played-badge">✔</span>` : ''}
            </div>
          </div>
          <div class="queue-item-duration">${duration}</div>
          <div class="queue-item-actions">
            ${!isPlaying ? `<button class="btn-play" data-index="${originalIndex}" title="${t('playPause')}">▶</button>` : ''}
            ${!isPlaying ? `<button class="btn-toggle" data-index="${originalIndex}" title="${isPlayed ? t('addToQueue') : t('removeFromQueue')}">${isPlayed ? '↻' : '⊖'}</button>` : ''}
            <button class="btn-remove" data-index="${originalIndex}" title="${t('remove')}">✕</button>
          </div>
        </li>
      `;
    })
    .join('');

  const items = list.querySelectorAll<HTMLElement>('.queue-item');
  items.forEach(item => {
    item.addEventListener('dragstart', onDragStart);
    item.addEventListener('dragend', onDragEnd);
    item.addEventListener('dragover', onDragOver);
    item.addEventListener('dragleave', onDragLeave);
    item.addEventListener('drop', onDrop);
  });

  list.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', e => {
      const index = parseInt(
        (e.currentTarget as HTMLElement).dataset.index || '0'
      );
      removeSong(index);
    });
  });

  list.querySelectorAll('.btn-play').forEach(btn => {
    btn.addEventListener('click', e => {
      const index = parseInt(
        (e.currentTarget as HTMLElement).dataset.index || '0'
      );
      playSong(index);
    });
  });

  list.querySelectorAll('.btn-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
      const index = parseInt(
        (e.currentTarget as HTMLElement).dataset.index || '0'
      );
      const item = state.queue[index];
      if (item?.played) {
        requeueSong(index);
      } else {
        removeSong(index);
      }
    });
  });
}

function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function onDragStart(e: DragEvent) {
  const item = e.currentTarget as HTMLElement;
  dragItem = item;
  item.classList.add('dragging');
  e.dataTransfer?.setData('text/plain', item.dataset.index || '0');
  e.dataTransfer!.effectAllowed = 'move';
}

function onDragEnd(e: DragEvent) {
  const item = e.currentTarget as HTMLElement;
  item.classList.remove('dragging');
  document
    .querySelectorAll('.queue-item.drag-over')
    .forEach(el => el.classList.remove('drag-over'));
  dragItem = null;
}

function onDragOver(e: DragEvent) {
  e.preventDefault();
  e.dataTransfer!.dropEffect = 'move';
  const item = e.currentTarget as HTMLElement;
  if (item !== dragItem) {
    item.classList.add('drag-over');
  }
}

function onDragLeave(e: DragEvent) {
  (e.currentTarget as HTMLElement).classList.remove('drag-over');
}

async function onDrop(e: DragEvent) {
  e.preventDefault();
  const target = e.currentTarget as HTMLElement;
  target.classList.remove('drag-over');
  if (!dragItem) return;

  const fromIndex = parseInt(dragItem.dataset.index || '0');
  const toIndex = parseInt(target.dataset.index || '0');
  if (fromIndex === toIndex) return;

  const queue = [...state.queue];
  const [moved] = queue.splice(fromIndex, 1);
  queue.splice(toIndex, 0, moved);

  let currentIndex = state.currentIndex;
  if (fromIndex === currentIndex) {
    currentIndex = toIndex;
  } else if (fromIndex < currentIndex && toIndex >= currentIndex) {
    currentIndex--;
  } else if (fromIndex > currentIndex && toIndex <= currentIndex) {
    currentIndex++;
  }

  state.queue = queue;
  state.currentIndex = currentIndex;
  await apiPost('/queue', { queue, currentIndex });
  renderQueue();
  updateQueueCount();
}

async function removeSong(index: number) {
  const queue = state.queue.filter((_, i) => i !== index);
  let currentIndex = state.currentIndex;

  if (index === currentIndex) {
    if (isLocalPlaybackMode()) {
      localPlayer?.pause();
      isPlaying = false;
      localLoadedVideoId = null;
    } else if (player) {
      player.stopVideo();
      isPlaying = false;
    }
    state.queue[index].played = true;
    if (queue.length === 0) {
      currentIndex = -1;
    } else if (index >= queue.length) {
      currentIndex = queue.length - 1;
    } else {
      currentIndex = index;
    }
  } else if (index < currentIndex) {
    currentIndex--;
  }

  state.queue = queue;
  state.currentIndex = currentIndex;
  await apiPost('/queue', { queue, currentIndex });
  renderQueue();
  updateQueueCount();
  playCurrent();
}

async function requeueSong(index: number) {
  if (index < 0 || index >= state.queue.length) return;
  state.queue[index].played = false;
  if (state.currentIndex === -1) {
    state.currentIndex = index;
    await apiPost('/player', { currentIndex: index });
  }
  await apiPost('/queue', {
    queue: state.queue,
    currentIndex: state.currentIndex,
  });
  renderQueue();
  updateQueueCount();
  if (state.currentIndex === index) {
    playCurrent();
  }
}

async function playSong(index: number) {
  if (index < 0 || index >= state.queue.length) return;

  state.currentIndex = index;
  await apiPost('/player', { currentIndex: index });

  renderQueue();
  playCurrent();
}

/**
 * Returns true when the UI should use the local HTML5 player.
 * @example isLocalPlaybackMode();
 */
function isLocalPlaybackMode(): boolean {
  return appSettings.playbackMode === 'local';
}

/**
 * Returns true for local mode with audio-only download quality.
 * In this mode the visual player, resize handle, and show/hide button stay hidden.
 * @example isLocalAudioOnlyMode();
 */
function isLocalAudioOnlyMode(): boolean {
  return isLocalPlaybackMode() && appSettings.downloadQuality === 'audio';
}

/**
 * Builds the authenticated media stream URL for a cached local clip.
 * @param videoId YouTube video id.
 * @example buildLocalMediaUrl('dQw4w9WgXcQ');
 */
function buildLocalMediaUrl(videoId: string): string {
  return `${API_BASE}/media?token=${encodeURIComponent(getToken())}&videoId=${encodeURIComponent(videoId)}`;
}

/**
 * Shows/hides YouTube quality controls and the visual player chrome
 * depending on playback mode / download quality.
 * @example applyPlaybackModeUi();
 */
function applyPlaybackModeUi() {
  const audioOnly = isLocalAudioOnlyMode();
  const qs = document.getElementById('quality-select');
  if (qs) {
    qs.classList.toggle('hidden', isLocalPlaybackMode());
    (qs as HTMLSelectElement).disabled = isLocalPlaybackMode();
  }
  const container = document.getElementById('player-container');
  if (container) {
    container.classList.toggle('hidden', audioOnly);
    container.classList.remove('audio-only');
  }
  const resizeHandle = document.getElementById('resize-handle');
  if (resizeHandle) {
    resizeHandle.classList.toggle('hidden', audioOnly);
  }
  const btnHide = document.getElementById('btn-hide-player');
  if (btnHide) {
    btnHide.classList.toggle('hidden', audioOnly);
  }
  // Re-evaluate section / eye-button state after mode changes.
  lastVisKey = '';
  updatePlayerVisibility();
}

/**
 * Switches DOM/player backends when settings change between iframe and local.
 * @param mode Target playback mode.
 * @example await switchPlaybackMode('local');
 */
async function switchPlaybackMode(mode: PlaybackMode) {
  const ytMount = document.getElementById('player');
  const localEl = document.getElementById(
    'local-player'
  ) as HTMLVideoElement | null;
  localPlayer = localEl;

  if (mode === 'local') {
    if (player && typeof player.destroy === 'function') {
      try {
        player.destroy();
      } catch {
        // Ignore destroy errors from a half-initialized player
      }
      player = null;
    }
    playerReady = false;
    if (ytMount) ytMount.classList.add('hidden');
    if (localEl) {
      localEl.classList.remove('hidden');
      bindLocalPlayerEvents(localEl);
    }
    localLoadedVideoId = null;
    playCurrent();
    return;
  }

  if (localEl) {
    localEl.pause();
    localEl.removeAttribute('src');
    localEl.load();
    localEl.classList.add('hidden');
  }
  if (ytMount) ytMount.classList.remove('hidden');
  localLoadedVideoId = null;
  if (youtubeApiReady) {
    createYouTubePlayer();
  } else {
    loadYouTubeAPI();
  }
}

/**
 * Binds HTML5 media events once for the local player element.
 * @param el Local `<video>` element.
 * @example bindLocalPlayerEvents(localPlayer);
 */
function bindLocalPlayerEvents(el: HTMLVideoElement) {
  if ((el as any)._srBound) return;
  (el as any)._srBound = true;
  el.addEventListener('play', () => {
    isPlaying = true;
    updatePlayButton();
    startSeekPolling();
    markCurrentPlayed();
  });
  el.addEventListener('pause', () => {
    isPlaying = false;
    updatePlayButton();
  });
  el.addEventListener('ended', () => {
    isPlaying = false;
    updatePlayButton();
    stopSeekPolling();
    seekBarReset();
    nextSong();
  });
  el.addEventListener('error', () => {
    isPlaying = false;
    updatePlayButton();
    markCurrentPlayed().then(() => nextSong());
  });
  el.addEventListener('loadedmetadata', () => {
    updateSeekBar();
  });
}

/**
 * Ensures the local clip is downloaded, then plays it in the HTML5 player.
 * @example await playCurrentLocal();
 */
async function playCurrentLocal() {
  const item = state.queue[state.currentIndex];
  const el =
    localPlayer ||
    (document.getElementById('local-player') as HTMLVideoElement | null);
  localPlayer = el;
  if (!el) return;

  if (!item) {
    el.pause();
    el.removeAttribute('src');
    el.load();
    localLoadedVideoId = null;
    isPlaying = false;
    updatePlayButton();
    setNowPlaying(t('noSong'));
    autoHidePlayer();
    return;
  }

  autoShowPlayer();
  applyPlaybackModeUi();
  setNowPlaying(t('nowPlaying', item.title, item.requestedBy));

  if (localLoadedVideoId === item.videoId && el.src) {
    try {
      el.currentTime = item.timestamp || 0;
      await el.play();
      isPlaying = true;
      updatePlayButton();
      startSeekPolling();
    } catch {
      isPlaying = false;
      updatePlayButton();
    }
    return;
  }

  if (preparingMedia) return;
  preparingMedia = true;
  showToast(t('downloading'), 8000);
  try {
    const prep = await apiPost('/prepare-media', { videoId: item.videoId });
    if (!prep.success) {
      showToast(prep.message || t('downloadFailed'));
      isPlaying = false;
      updatePlayButton();
      return;
    }

    el.pause();
    el.src = buildLocalMediaUrl(item.videoId);
    el.volume = Math.max(0, Math.min(1, state.volume / 100));
    el.load();
    await new Promise<void>((resolve, reject) => {
      const onReady = () => {
        cleanup();
        resolve();
      };
      const onError = () => {
        cleanup();
        reject(new Error('media load failed'));
      };
      const cleanup = () => {
        el.removeEventListener('loadeddata', onReady);
        el.removeEventListener('error', onError);
      };
      el.addEventListener('loadeddata', onReady, { once: true });
      el.addEventListener('error', onError, { once: true });
    });

    localLoadedVideoId = item.videoId;
    el.currentTime = item.timestamp || 0;
    await el.play();
    isPlaying = true;
    updatePlayButton();
    startSeekPolling();
  } catch (err) {
    console.error('Local playback failed:', err);
    showToast(t('downloadFailed'));
    isPlaying = false;
    updatePlayButton();
  } finally {
    preparingMedia = false;
  }
}

function playCurrent() {
  if (isLocalPlaybackMode()) {
    void playCurrentLocal();
    return;
  }

  if (!playerReady || !player) return;

  const item = state.queue[state.currentIndex];
  if (!item) {
    player.stopVideo();
    isPlaying = false;
    updatePlayButton();
    setNowPlaying(t('noSong'));
    autoHidePlayer();
    return;
  }

  autoShowPlayer();
  const startTime = item.timestamp || 0;
  player.loadVideoById({ videoId: item.videoId, startSeconds: startTime });
  isPlaying = true;
  updatePlayButton();
  setNowPlaying(t('nowPlaying', item.title, item.requestedBy));
  startSeekPolling();
}

/**
 * Syncs the YouTube player with `state.currentIndex` / queue changes.
 * Dashboard attach play/stop bumps `playToken` so the same videoId can be
 * force-restarted or paused without waiting for a different track.
 * @returns {void}
 * @example updatePlayerState();
 */
function updatePlayerState() {
  if (isLocalPlaybackMode()) {
    if (
      typeof state.playToken === 'number' &&
      state.playToken !== lastPlayToken
    ) {
      lastPlayToken = state.playToken;
      const el =
        localPlayer ||
        (document.getElementById('local-player') as HTMLVideoElement | null);
      if (state.playAction === 'stop') {
        el?.pause();
        isPlaying = false;
        updatePlayButton();
        return;
      }
      if (state.playAction === 'play') {
        playCurrent();
        return;
      }
    }

    if (state.currentIndex === -1) {
      const firstUnplayed = state.queue.findIndex(item => !item.played);
      if (firstUnplayed !== -1) {
        state.currentIndex = firstUnplayed;
        apiPost('/player', { currentIndex: firstUnplayed });
        playCurrent();
        renderQueue();
        return;
      }
      if (isPlaying) {
        localPlayer?.pause();
        isPlaying = false;
        updatePlayButton();
      }
      setNowPlaying(t('noSong'));
      autoHidePlayer();
      return;
    }

    const currentItem = state.queue[state.currentIndex];
    if (!currentItem) {
      if (isPlaying) {
        localPlayer?.pause();
        isPlaying = false;
        updatePlayButton();
      }
      setNowPlaying(t('noSong'));
      autoHidePlayer();
      return;
    }

    if (localLoadedVideoId !== currentItem.videoId) {
      playCurrent();
    }
    return;
  }

  if (!playerReady || !player) return;

  if (
    typeof state.playToken === 'number' &&
    state.playToken !== lastPlayToken
  ) {
    lastPlayToken = state.playToken;
    if (state.playAction === 'stop') {
      try {
        player.pauseVideo();
      } catch {
        // Ignore pause errors from a half-initialized player
      }
      isPlaying = false;
      updatePlayButton();
      return;
    }
    if (state.playAction === 'play') {
      playCurrent();
      return;
    }
  }

  if (state.currentIndex === -1) {
    const firstUnplayed = state.queue.findIndex(item => !item.played);
    if (firstUnplayed !== -1) {
      state.currentIndex = firstUnplayed;
      apiPost('/player', { currentIndex: firstUnplayed });
      playCurrent();
      renderQueue();
      return;
    }
    if (isPlaying) {
      player.stopVideo();
      isPlaying = false;
      updatePlayButton();
    }
    setNowPlaying(t('noSong'));
    autoHidePlayer();
    return;
  }

  const currentItem = state.queue[state.currentIndex];
  if (!currentItem) {
    if (isPlaying) {
      player.stopVideo();
      isPlaying = false;
      updatePlayButton();
    }
    setNowPlaying(t('noSong'));
    autoHidePlayer();
    return;
  }

  const currentVideoId = player.getVideoData?.()?.video_id;
  if (currentVideoId !== currentItem.videoId) {
    playCurrent();
  }
}

let lastVisKey = '';

function updatePlayerVisibility() {
  const section = document.getElementById('player-video-section');
  const btnHide = document.getElementById('btn-hide-player');
  const audioOnly = isLocalAudioOnlyMode();
  const nothingPlaying = state.currentIndex === -1 || !state.queue.length;
  // Audio-only local mode never shows the video chrome; keep the section
  // (seek bar) visible while a track is current.
  const shouldHide = audioOnly
    ? nothingPlaying
    : state.playerHidden || nothingPlaying;
  const btnDisabled = nothingPlaying || audioOnly;

  const visKey = `${shouldHide}:${btnDisabled}:${audioOnly}`;
  if (visKey === lastVisKey) return;
  lastVisKey = visKey;

  if (section) {
    section.classList.toggle('hidden', shouldHide);
  }
  if (btnHide) {
    if (audioOnly) {
      btnHide.classList.add('hidden');
      (btnHide as HTMLButtonElement).disabled = true;
      btnHide.style.opacity = '';
      btnHide.style.pointerEvents = '';
      btnHide.title = '';
      return;
    }
    btnHide.classList.remove('hidden');
    (btnHide as HTMLButtonElement).disabled = btnDisabled;
    btnHide.style.opacity = btnDisabled ? '0.3' : '1';
    btnHide.style.pointerEvents = btnDisabled ? 'none' : 'auto';
    btnHide.title = btnDisabled
      ? ''
      : state.playerHidden
        ? t('showPlayer')
        : t('hidePlayer');
  }
}

function autoHidePlayer() {
  // Visual player chrome is permanently off in local audio-only mode.
  if (isLocalAudioOnlyMode()) {
    lastVisKey = '';
    updatePlayerVisibility();
    return;
  }
  if (!state.playerHidden) {
    state.playerHidden = true;
    apiPost('/player', { playerHidden: true });
    updatePlayerVisibility();
  }
}

function autoShowPlayer() {
  if (isLocalAudioOnlyMode()) {
    lastVisKey = '';
    updatePlayerVisibility();
    return;
  }
  if (state.playerHidden) {
    state.playerHidden = false;
    apiPost('/player', { playerHidden: false });
    updatePlayerVisibility();
  }
}

async function togglePlayerVisibility(hide: boolean) {
  state.playerHidden = hide;
  await apiPost('/player', { playerHidden: state.playerHidden });
  updatePlayerVisibility();
}

async function setVolume(vol: number) {
  state.volume = Math.max(0, Math.min(100, vol));
  await apiPost('/player', { volume: state.volume });
  if (isLocalPlaybackMode() && localPlayer) {
    localPlayer.volume = Math.max(0, Math.min(1, state.volume / 100));
    return;
  }
  if (player && playerReady) {
    player.setVolume(state.volume);
  }
}

/**
 * Pixel sizes that nudge YouTube's ABR toward a given quality ladder.
 * API setPlaybackQuality is a no-op; ABR follows the iframe content viewport.
 * @type {Record<string, { w: number, h: number }>}
 */
const QUALITY_VIEWPORT: Record<string, { w: number; h: number }> = {
  small: { w: 256, h: 144 },
  medium: { w: 640, h: 360 },
  large: { w: 854, h: 480 },
  hd720: { w: 1280, h: 720 },
  hd1080: { w: 1920, h: 1080 },
};

/**
 * Resolves the YouTube iframe element created by the IFrame API.
 * @returns {HTMLIFrameElement | null}
 * @example getPlayerIframe();
 */
function getPlayerIframe(): HTMLIFrameElement | null {
  const container = document.getElementById('player-container');
  if (!container) return null;
  const iframe = container.querySelector('iframe');
  return iframe instanceof HTMLIFrameElement ? iframe : null;
}

/**
 * Sizes the iframe content viewport to the target quality and CSS-scales it
 * to fit the visible container (contain, no crop). Transform does not change
 * the iframe viewport, so YouTube still encodes at the locked resolution.
 * Recalculates on every call so live container resizes stay correct.
 * @param {string} [quality=selectedQuality] - Quality id from the select
 * @example applyPlaybackQuality('small');
 */
function applyPlaybackQuality(quality: string = selectedQuality) {
  const container = document.getElementById('player-container');
  if (!container) return;

  if (quality === 'default' || !QUALITY_VIEWPORT[quality]) {
    container.classList.remove('quality-locked');
    container.style.removeProperty('--quality-w');
    container.style.removeProperty('--quality-h');
    container.style.removeProperty('--quality-scale');
    container.style.removeProperty('--quality-tx');
    container.style.removeProperty('--quality-ty');

    const cw = Math.max(1, container.clientWidth);
    const ch = Math.max(1, container.clientHeight);
    if (player && typeof player.setSize === 'function') {
      player.setSize(cw, ch);
    }
    const iframe = getPlayerIframe();
    if (iframe) {
      iframe.removeAttribute('width');
      iframe.removeAttribute('height');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.transform = '';
      iframe.style.position = '';
      iframe.style.top = '';
      iframe.style.left = '';
    }
    return;
  }

  const target = QUALITY_VIEWPORT[quality];
  const cw = Math.max(1, container.clientWidth);
  const ch = Math.max(1, container.clientHeight);
  // contain: fit entirely inside the container (no edge crop)
  const scale = Math.min(cw / target.w, ch / target.h);
  const offsetX = (cw - target.w * scale) / 2;
  const offsetY = (ch - target.h * scale) / 2;

  container.classList.add('quality-locked');
  container.style.setProperty('--quality-w', `${target.w}px`);
  container.style.setProperty('--quality-h', `${target.h}px`);
  container.style.setProperty('--quality-scale', String(scale));
  container.style.setProperty('--quality-tx', `${offsetX}px`);
  container.style.setProperty('--quality-ty', `${offsetY}px`);

  if (player && typeof player.setSize === 'function') {
    player.setSize(target.w, target.h);
  }

  const iframe = getPlayerIframe();
  if (iframe) {
    iframe.setAttribute('width', String(target.w));
    iframe.setAttribute('height', String(target.h));
    iframe.style.width = `${target.w}px`;
    iframe.style.height = `${target.h}px`;
    iframe.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    iframe.style.transformOrigin = '0 0';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.maxWidth = 'none';
    iframe.style.maxHeight = 'none';
  }
}

/**
 * Observes player-container size changes (window resize, height drag, layout).
 * @returns {void}
 * @example watchPlayerContainerResize();
 */
function watchPlayerContainerResize() {
  const container = document.getElementById('player-container');
  if (!container) return;

  let rafId = 0;
  const schedule = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      applyPlaybackQuality();
    });
  };

  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(schedule);
    observer.observe(container);
  }

  window.addEventListener('resize', schedule);
}

/**
 * PlayerVars shared by all YouTube player instances.
 * @type {Record<string, number>}
 */
const YT_PLAYER_VARS = {
  controls: 0,
  disablekb: 1,
  fs: 0,
  iv_load_policy: 3,
  modestbranding: 1,
  rel: 0,
  showinfo: 0,
  autoplay: 1,
  playsinline: 1,
};

/**
 * Ensures a fresh mount node exists for YT.Player (API replaces #player with an iframe).
 * @returns {void}
 * @example ensurePlayerMount();
 */
function ensurePlayerMount() {
  const container = document.getElementById('player-container');
  if (!container) return;
  if (!document.getElementById('player')) {
    container.innerHTML = '<div id="player"></div>';
  }
}

/**
 * Creates (or recreates) the YouTube player at a viewport sized for the quality lock.
 * @param {string} [videoId] - Optional video to load immediately
 * @param {number} [startSeconds=0] - Start offset in seconds
 * @example createYouTubePlayer('dQw4w9WgXcQ', 12);
 */
function createYouTubePlayer(videoId?: string, startSeconds: number = 0) {
  ensurePlayerMount();

  const container = document.getElementById('player-container');
  const locked = QUALITY_VIEWPORT[selectedQuality];
  const width = locked ? locked.w : Math.max(1, container?.clientWidth || 640);
  const height = locked
    ? locked.h
    : Math.max(1, container?.clientHeight || 360);

  playerReady = false;

  if (player && typeof player.destroy === 'function') {
    try {
      player.destroy();
    } catch {
      // Ignore destroy errors from a half-initialized player
    }
    player = null;
  }

  ensurePlayerMount();

  const options: Record<string, unknown> = {
    width,
    height,
    playerVars: { ...YT_PLAYER_VARS },
    events: {
      onStateChange: onPlayerStateChange,
      onReady: onPlayerReady,
      onError: onPlayerError,
    },
  };

  if (videoId) {
    options.videoId = videoId;
    (options.playerVars as Record<string, number>).start =
      Math.floor(startSeconds);
  }

  player = new YT.Player('player', options);
  applyPlaybackQuality();
}

/**
 * Stores the selected quality and recreates the player so ABR initializes
 * against the locked iframe viewport (required for real downgrades to 144p).
 * @param {string} quality - Quality id from the quality select
 * @example setQuality('small');
 */
function setQuality(quality: string) {
  selectedQuality = quality;
  applyPlaybackQuality(quality);

  if (!youtubeApiReady) return;

  const item = state.queue[state.currentIndex];
  const currentTime =
    player && typeof player.getCurrentTime === 'function'
      ? player.getCurrentTime()
      : 0;
  const startSeconds =
    item && typeof currentTime === 'number' && currentTime > 0
      ? currentTime
      : item?.timestamp || 0;

  createYouTubePlayer(item?.videoId, startSeconds);
}

function updatePlayButton() {
  const btn = document.getElementById('btn-play-pause');
  if (btn) btn.textContent = isPlaying ? '⏸' : '▶';
}

function updateSeekBar() {
  if (seeking) return;
  const seekBar = document.getElementById('seek-bar') as HTMLInputElement;
  const timeCurrent = document.getElementById('time-current');
  const timeTotal = document.getElementById('time-total');
  if (!seekBar) return;

  if (isLocalPlaybackMode()) {
    const el =
      localPlayer ||
      (document.getElementById('local-player') as HTMLVideoElement | null);
    if (!el || !el.duration || !Number.isFinite(el.duration)) return;
    seekBar.max = String(Math.floor(el.duration));
    seekBar.value = String(Math.floor(el.currentTime || 0));
    if (timeCurrent)
      timeCurrent.textContent = formatDurationShort(
        Math.floor(el.currentTime || 0)
      );
    if (timeTotal) {
      const queued = state.queue[state.currentIndex];
      timeTotal.textContent = formatDurationShort(
        queued?.duration || Math.floor(el.duration)
      );
    }
    return;
  }

  if (!player || !playerReady) return;

  const duration = player.getDuration();
  const currentTime = player.getCurrentTime();

  if (duration > 0) {
    seekBar.max = String(Math.floor(duration));
    seekBar.value = String(Math.floor(currentTime));
  }
  if (timeCurrent)
    timeCurrent.textContent = formatDurationShort(Math.floor(currentTime));
  if (timeTotal && state.queue[state.currentIndex]) {
    timeTotal.textContent = formatDurationShort(
      state.queue[state.currentIndex].duration
    );
  }
}

function startSeekPolling() {
  stopSeekPolling();
  seekTimer = window.setInterval(updateSeekBar, 250);
}

function stopSeekPolling() {
  if (seekTimer !== null) {
    clearInterval(seekTimer);
    seekTimer = null;
  }
}

function onPlayerStateChange(event: any) {
  if (!event || event.data === undefined) return;

  switch (event.data) {
    case YT.PlayerState.BUFFERING:
      applyPlaybackQuality();
      break;
    case YT.PlayerState.PLAYING:
      isPlaying = true;
      updatePlayButton();
      startSeekPolling();
      applyPlaybackQuality();
      markCurrentPlayed();
      break;
    case YT.PlayerState.PAUSED:
      isPlaying = false;
      updatePlayButton();
      break;
    case YT.PlayerState.ENDED:
      isPlaying = false;
      updatePlayButton();
      stopSeekPolling();
      seekBarReset();
      nextSong();
      break;
    case YT.PlayerState.CUED:
      if (player) {
        player.setVolume(state.volume);
        applyPlaybackQuality();
        updateSeekBar();
      }
      break;
  }
}

function seekBarReset() {
  const seekBar = document.getElementById('seek-bar') as HTMLInputElement;
  const timeCurrent = document.getElementById('time-current');
  if (seekBar) {
    seekBar.value = '0';
    seekBar.max = '100';
  }
  if (timeCurrent) timeCurrent.textContent = '0:00';
}

function onPlayerReady() {
  playerReady = true;
  if (player) {
    player.setVolume(state.volume);
    applyPlaybackQuality();
  }

  const videoId = player?.getVideoData?.()?.video_id;
  if (videoId) {
    isPlaying = true;
    updatePlayButton();
    const item = state.queue[state.currentIndex];
    if (item) {
      setNowPlaying(t('nowPlaying', item.title, item.requestedBy));
      autoShowPlayer();
    }
    startSeekPolling();
    return;
  }

  playCurrent();
}

function onPlayerError() {
  isPlaying = false;
  updatePlayButton();
  markCurrentPlayed().then(() => nextSong());
}

async function markCurrentPlayed() {
  const item = state.queue[state.currentIndex];
  if (!item || item.played) return;
  item.played = true;
  await apiPost('/queue', {
    queue: state.queue,
    currentIndex: state.currentIndex,
  });
}

async function nextSong() {
  await markCurrentPlayed();
  const nextIdx = state.queue.findIndex(item => !item.played);
  if (nextIdx !== -1) {
    state.currentIndex = nextIdx;
    await apiPost('/player', { currentIndex: state.currentIndex });
    renderQueue();
    playCurrent();
  } else {
    state.currentIndex = -1;
    await apiPost('/player', { currentIndex: -1 });
    renderQueue();
    updatePlayButton();
  }
}

async function prevSong() {
  if (state.currentIndex > 0) {
    state.currentIndex--;
    await apiPost('/player', { currentIndex: state.currentIndex });
    renderQueue();
    playCurrent();
  }
}

function togglePlayPause() {
  if (isLocalPlaybackMode()) {
    const el =
      localPlayer ||
      (document.getElementById('local-player') as HTMLVideoElement | null);
    if (!el) return;
    if (isPlaying) {
      el.pause();
    } else if (state.queue[state.currentIndex]) {
      void el.play();
    } else {
      playCurrent();
    }
    return;
  }

  if (!player || !playerReady) return;
  if (isPlaying) {
    player.pauseVideo();
  } else {
    const item = state.queue[state.currentIndex];
    if (item) {
      player.playVideo();
      isPlaying = true;
      updatePlayButton();
    }
  }
}

/**
 * Starts polling worker state so dashboard attach play/stop is applied quickly.
 * @returns {void}
 * @example startPolling();
 */
function startPolling() {
  pollTimer = window.setInterval(loadState, 1000);
}

function stopPolling() {
  if (pollTimer !== null) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}

function showToast(message: string, duration = 4000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function openAddModal() {
  pendingAdd = null;
  const overlay = document.getElementById('modal-overlay');
  const addInputGroup = document.getElementById('add-input-group');
  const addResult = document.getElementById('add-result');
  const footer = document.getElementById('modal-footer');
  const modalTitle = document.getElementById('modal-title');
  const addInput = document.getElementById('add-input') as HTMLInputElement;
  if (overlay) overlay.classList.remove('hidden');
  if (addInputGroup) addInputGroup.classList.remove('hidden');
  if (addResult) addResult.classList.add('hidden');
  if (footer) footer.classList.add('hidden');
  if (modalTitle) modalTitle.textContent = t('addTitle');
  if (addInput) {
    addInput.value = '';
    addInput.focus();
  }
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.add('hidden');
  pendingAdd = null;
}

async function handleAddSubmit() {
  const input = document.getElementById('add-input') as HTMLInputElement;
  const btn = document.getElementById('btn-add') as HTMLButtonElement;
  const spinner = document.getElementById('add-spinner');
  if (!input || !btn || !spinner) return;

  const url = input.value.trim();
  if (!url) return;

  btn.disabled = true;
  btn.textContent = t('addFetching');
  spinner.classList.remove('hidden');

  try {
    const res = await apiPost('/validate-url', { url });
    if (!res.success) {
      showToast(res.message || t('invalidUrl'));
      return;
    }

    const addInputGroup = document.getElementById('add-input-group');
    const addResult = document.getElementById('add-result');
    const footer = document.getElementById('modal-footer');
    const modalTitle = document.getElementById('modal-title');

    if (res.errors.length === 0) {
      const addRes = await apiPost('/manual-add', {
        url,
        info: res.info,
        requestedBy: 'Manual',
      });
      if (addRes.success) {
        state = addRes.state;
        updateUI();
        showToast(t('added'));
        closeModal();
      } else {
        showToast(t('addError'));
      }
      return;
    }

    pendingAdd = { url, info: res.info };
    if (addInputGroup) addInputGroup.classList.add('hidden');
    if (addResult) addResult.classList.remove('hidden');
    if (footer) footer.classList.remove('hidden');
    if (modalTitle) modalTitle.textContent = t('restrictionsTitle');

    const titleEl = document.getElementById('modal-video-title');
    const metaEl = document.getElementById('modal-video-meta');
    const thumbEl = document.getElementById('modal-thumb') as HTMLImageElement;
    const errorsEl = document.getElementById('modal-errors');
    const addAnywayBtn = document.getElementById('modal-add-anyway');
    const cancelBtn = document.getElementById('modal-cancel');

    if (titleEl) titleEl.textContent = res.info.title || '';
    if (metaEl)
      metaEl.textContent = `${t('duration')}: ${formatDurationShort(res.info.duration || 0)} • ${formatNumber(res.info.viewCount || 0)} ${t('views')}`;
    if (thumbEl) thumbEl.src = res.info.thumbnail || '';
    if (addAnywayBtn) addAnywayBtn.textContent = t('addAnyway');
    if (cancelBtn) cancelBtn.textContent = t('cancel');

    if (errorsEl) {
      errorsEl.innerHTML = res.errors
        .map((e: string) => `<div class="modal-error">${escapeHtml(e)}</div>`)
        .join('');
    }
  } catch {
    showToast(t('fetchFailed'));
  } finally {
    btn.disabled = false;
    btn.textContent = t('addButton');
    spinner.classList.add('hidden');
  }
}

async function confirmManualAdd() {
  if (!pendingAdd) return;
  closeModal();

  try {
    const addRes = await apiPost('/manual-add', {
      url: pendingAdd.url,
      info: pendingAdd.info,
      requestedBy: 'Manual',
    });
    if (addRes.success) {
      state = addRes.state;
      updateUI();
      showToast(t('added'));
    } else {
      showToast(t('addError'));
    }
  } catch {
    showToast(t('addError'));
  }
  pendingAdd = null;
}

function init() {
  applyPlayerHeight();

  document
    .getElementById('btn-play-pause')
    ?.addEventListener('click', togglePlayPause);
  document.getElementById('btn-skip')?.addEventListener('click', nextSong);
  document.getElementById('btn-prev')?.addEventListener('click', prevSong);
  document
    .getElementById('btn-hide-player')
    ?.addEventListener('click', () =>
      togglePlayerVisibility(!state.playerHidden)
    );

  const volumeSlider = document.getElementById(
    'volume-slider'
  ) as HTMLInputElement;
  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      const vol = parseInt(volumeSlider.value);
      setVolume(vol);
    });
  }

  const qualitySelect = document.getElementById(
    'quality-select'
  ) as HTMLSelectElement;
  if (qualitySelect) {
    qualitySelect.value = selectedQuality;
    qualitySelect.addEventListener('change', () => {
      setQuality(qualitySelect.value);
    });
  }

  const seekBar = document.getElementById('seek-bar') as HTMLInputElement;
  if (seekBar) {
    seekBar.addEventListener('input', () => {
      seeking = true;
    });
    seekBar.addEventListener('change', () => {
      const value = parseInt(seekBar.value);
      if (isLocalPlaybackMode() && localPlayer) {
        localPlayer.currentTime = value;
      } else if (player && playerReady) {
        player.seekTo(value, true);
      }
      seeking = false;
    });
  }

  const resizeHandle = document.getElementById('resize-handle');
  if (resizeHandle) {
    let startY = 0;
    let startHeight = 0;
    const playerContainer = document.getElementById('player-container');

    resizeHandle.addEventListener('mousedown', e => {
      e.preventDefault();
      startY = (e as MouseEvent).clientY;
      startHeight = playerContainer
        ? playerContainer.offsetHeight
        : state.playerHeight;
      resizeHandle.classList.add('active');
      document.body.style.cursor = 'ns-resize';
      document.body.style.userSelect = 'none';
      if (playerContainer) playerContainer.style.pointerEvents = 'none';

      const onMouseMove = (ev: MouseEvent) => {
        const diff = ev.clientY - startY;
        const newHeight = Math.max(100, startHeight + diff);
        if (playerContainer) {
          playerContainer.style.height = `${newHeight}px`;
          playerContainer.style.maxHeight = `${newHeight}px`;
          applyPlaybackQuality();
        }
      };

      const onMouseUp = (ev: MouseEvent) => {
        const diff = ev.clientY - startY;
        const newHeight = Math.max(100, startHeight + diff);
        state.playerHeight = newHeight;
        apiPost('/player', { playerHeight: newHeight });
        resizeHandle.classList.remove('active');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        if (playerContainer) playerContainer.style.pointerEvents = '';
        applyPlaybackQuality();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  document
    .getElementById('btn-open-add')
    ?.addEventListener('click', openAddModal);
  document
    .getElementById('btn-add')
    ?.addEventListener('click', handleAddSubmit);
  const addInput = document.getElementById('add-input') as HTMLInputElement;
  if (addInput) {
    addInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleAddSubmit();
    });
  }

  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document
    .getElementById('modal-cancel')
    ?.addEventListener('click', closeModal);
  document
    .getElementById('modal-add-anyway')
    ?.addEventListener('click', confirmManualAdd);
  document.getElementById('modal-overlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  loadState().then(() => {
    localPlayer = document.getElementById(
      'local-player'
    ) as HTMLVideoElement | null;
    if (localPlayer) bindLocalPlayerEvents(localPlayer);
    applyPlaybackModeUi();
    if (isLocalPlaybackMode()) {
      void switchPlaybackMode('local');
    }
    startPolling();
  });

  watchPlayerContainerResize();
}

let youtubeLoaded = false;

function loadYouTubeAPI() {
  if (youtubeLoaded || isLocalPlaybackMode()) return;
  youtubeLoaded = true;
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const first = document.getElementsByTagName('script')[0];
  first.parentNode!.insertBefore(tag, first);
}

window.onYouTubeIframeAPIReady = () => {
  youtubeApiReady = true;
  if (!isLocalPlaybackMode()) {
    createYouTubePlayer();
  }
};

loadYouTubeAPI();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
