type Locale = 'en' | 'ru' | 'uk';

const LOCALE: Record<string, Locale> = { en: 'en', ru: 'ru', uk: 'uk' };

const T = {
  en: {
    queue: 'Order History',
    songs: (n: number) => `${n} song${n !== 1 ? 's' : ''}`,
    noSong: 'No song playing',
    queueEmpty: 'No song history yet. Songs requested via donations will appear here.',
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
    nowPlaying: (title: string, name: string) => `${title} — requested by ${name}`,
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
    nowPlaying: (title: string, name: string) => `${title} — заказал(а) ${name}`,
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
  },
  uk: {
    queue: 'Історія замовлень',
    songs: (n: number) => `${n} ${pluralize(n, ['пісня', 'пісні', 'пісень'])}`,
    noSong: 'Немає треків',
    queueEmpty: 'Історія замовлень порожня. Замовлені через донати треки з\'являться тут.',
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
    nowPlaying: (title: string, name: string) => `${title} — замовив(ла) ${name}`,
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

let state: AppState = { queue: [], currentIndex: -1, playerHidden: false, volume: 50, playerHeight: 360 };
let player: any = null;
let isPlaying = false;
let playerReady = false;
let pollTimer: number | null = null;
let seekTimer: number | null = null;
let dragItem: HTMLElement | null = null;
let youtubeApiReady = false;
let seeking = false;
let selectedQuality: string = 'default';
let pendingAdd: { url: string; info: any } | null = null;
let lastRenderKey = '';

const API_BASE = `http://localhost:${window.location.port}/addon/song-request`;

function getToken(): string {
  return new URLSearchParams(window.location.search).get('token') || '';
}

async function apiGet(path: string): Promise<any> {
  const res = await fetch(`${API_BASE}${path}?token=${encodeURIComponent(getToken())}`);
  return res.json();
}

async function apiPost(path: string, body: any): Promise<any> {
  const res = await fetch(`${API_BASE}${path}?token=${encodeURIComponent(getToken())}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
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
  const locMap: Record<string, string> = { en: 'en-US', ru: 'ru-RU', uk: 'uk-UA' };
  return n.toLocaleString(locMap[lang] || 'en-US');
}

function applyPlayerHeight() {
  const pc = document.getElementById('player-container');
  if (pc && state.playerHeight) {
    pc.style.height = `${state.playerHeight}px`;
    pc.style.maxHeight = `${state.playerHeight}px`;
    pc.style.aspectRatio = 'unset';
  }
}

async function loadState() {
  try {
    const data = await apiGet('/state');
    if (data.success) {
      state = data.state;
      if (data.lang && LOCALE[data.lang]) {
        lang = LOCALE[data.lang];
      }
      updateUI();
      updateStaticText();
      applyPlayerHeight();
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
      const thumb = item.thumbnail || `https://i.ytimg.com/vi/${item.videoId}/default.jpg`;
      const duration = formatDurationShort(item.duration);
      const timestampStr = item.timestamp > 0 ? `${t('startAt')} ${formatDurationShort(item.timestamp)}` : '';
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
  items.forEach((item) => {
    item.addEventListener('dragstart', onDragStart);
    item.addEventListener('dragend', onDragEnd);
    item.addEventListener('dragover', onDragOver);
    item.addEventListener('dragleave', onDragLeave);
    item.addEventListener('drop', onDrop);
  });

  list.querySelectorAll('.btn-remove').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = parseInt((e.currentTarget as HTMLElement).dataset.index || '0');
      removeSong(index);
    });
  });

  list.querySelectorAll('.btn-play').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = parseInt((e.currentTarget as HTMLElement).dataset.index || '0');
      playSong(index);
    });
  });

  list.querySelectorAll('.btn-toggle').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = parseInt((e.currentTarget as HTMLElement).dataset.index || '0');
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
  document.querySelectorAll('.queue-item.drag-over').forEach((el) => el.classList.remove('drag-over'));
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
    if (player) {
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
  await apiPost('/queue', { queue: state.queue, currentIndex: state.currentIndex });
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

function playCurrent() {
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

function updatePlayerState() {
  if (!playerReady || !player) return;

  if (state.currentIndex === -1) {
    const firstUnplayed = state.queue.findIndex((item) => !item.played);
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
  const nothingPlaying = state.currentIndex === -1 || !state.queue.length;
  const shouldHide = state.playerHidden || nothingPlaying;
  const btnDisabled = nothingPlaying;

  const visKey = `${shouldHide}:${btnDisabled}`;
  if (visKey === lastVisKey) return;
  lastVisKey = visKey;

  if (section) {
    section.classList.toggle('hidden', shouldHide);
  }
  if (btnHide) {
    btnHide.disabled = btnDisabled;
    btnHide.style.opacity = btnDisabled ? '0.3' : '1';
    btnHide.style.pointerEvents = btnDisabled ? 'none' : 'auto';
    btnHide.title = btnDisabled ? '' : (state.playerHidden ? t('showPlayer') : t('hidePlayer'));
  }
}

function autoHidePlayer() {
  if (!state.playerHidden) {
    state.playerHidden = true;
    apiPost('/player', { playerHidden: true });
    updatePlayerVisibility();
  }
}

function autoShowPlayer() {
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
  if (player && playerReady) {
    player.setVolume(state.volume);
  }
}

function setQuality(quality: string) {
  selectedQuality = quality;
  if (player && playerReady && player.setPlaybackQuality) {
    player.setPlaybackQuality(quality);
  }
}

function updatePlayButton() {
  const btn = document.getElementById('btn-play-pause');
  if (btn) btn.textContent = isPlaying ? '⏸' : '▶';
}

function updateSeekBar() {
  if (!player || !playerReady || seeking) return;
  const seekBar = document.getElementById('seek-bar') as HTMLInputElement;
  const timeCurrent = document.getElementById('time-current');
  const timeTotal = document.getElementById('time-total');
  if (!seekBar) return;

  const duration = player.getDuration();
  const currentTime = player.getCurrentTime();

  if (duration > 0) {
    seekBar.max = String(Math.floor(duration));
    seekBar.value = String(Math.floor(currentTime));
  }
  if (timeCurrent) timeCurrent.textContent = formatDurationShort(Math.floor(currentTime));
  if (timeTotal && state.queue[state.currentIndex]) {
    timeTotal.textContent = formatDurationShort(state.queue[state.currentIndex].duration);
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
    case YT.PlayerState.PLAYING:
      isPlaying = true;
      updatePlayButton();
      startSeekPolling();
      player.setPlaybackQuality(selectedQuality);
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
        player.setPlaybackQuality(selectedQuality);
        updateSeekBar();
      }
      break;
  }
}

function seekBarReset() {
  const seekBar = document.getElementById('seek-bar') as HTMLInputElement;
  const timeCurrent = document.getElementById('time-current');
  if (seekBar) { seekBar.value = '0'; seekBar.max = '100'; }
  if (timeCurrent) timeCurrent.textContent = '0:00';
}

function onPlayerReady() {
  playerReady = true;
  if (player) {
    player.setVolume(state.volume);
    player.setPlaybackQuality(selectedQuality);
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
  await apiPost('/queue', { queue: state.queue, currentIndex: state.currentIndex });
}

async function nextSong() {
  await markCurrentPlayed();
  const nextIdx = state.queue.findIndex((item) => !item.played);
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

function startPolling() {
  pollTimer = window.setInterval(loadState, 3000);
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
  if (addInput) { addInput.value = ''; addInput.focus(); }
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
      const addRes = await apiPost('/manual-add', { url, info: res.info, requestedBy: 'Manual' });
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
    if (metaEl) metaEl.textContent = `${t('duration')}: ${formatDurationShort(res.info.duration || 0)} • ${formatNumber(res.info.viewCount || 0)} ${t('views')}`;
    if (thumbEl) thumbEl.src = res.info.thumbnail || '';
    if (addAnywayBtn) addAnywayBtn.textContent = t('addAnyway');
    if (cancelBtn) cancelBtn.textContent = t('cancel');

    if (errorsEl) {
      errorsEl.innerHTML = res.errors.map((e: string) => `<div class="modal-error">${escapeHtml(e)}</div>`).join('');
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

  document.getElementById('btn-play-pause')?.addEventListener('click', togglePlayPause);
  document.getElementById('btn-skip')?.addEventListener('click', nextSong);
  document.getElementById('btn-prev')?.addEventListener('click', prevSong);
  document.getElementById('btn-hide-player')?.addEventListener('click', () => togglePlayerVisibility(!state.playerHidden));

  const volumeSlider = document.getElementById('volume-slider') as HTMLInputElement;
  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      const vol = parseInt(volumeSlider.value);
      setVolume(vol);
    });
  }

  const qualitySelect = document.getElementById('quality-select') as HTMLSelectElement;
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
      if (player && playerReady) {
        player.seekTo(parseInt(seekBar.value), true);
      }
      seeking = false;
    });
  }

  const resizeHandle = document.getElementById('resize-handle');
  if (resizeHandle) {
    let startY = 0;
    let startHeight = 0;
    const playerContainer = document.getElementById('player-container');

    resizeHandle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      startY = (e as MouseEvent).clientY;
      startHeight = playerContainer ? playerContainer.offsetHeight : state.playerHeight;
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
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  document.getElementById('btn-open-add')?.addEventListener('click', openAddModal);
  document.getElementById('btn-add')?.addEventListener('click', handleAddSubmit);
  const addInput = document.getElementById('add-input') as HTMLInputElement;
  if (addInput) {
    addInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAddSubmit();
    });
  }

  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal-cancel')?.addEventListener('click', closeModal);
  document.getElementById('modal-add-anyway')?.addEventListener('click', confirmManualAdd);
  document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  loadState().then(() => {
    startPolling();
  });
}

declare global {
  const YT: any;
  function onYouTubeIframeAPIReady(): void;
}

let youtubeLoaded = false;

function loadYouTubeAPI() {
  if (youtubeLoaded) return;
  youtubeLoaded = true;
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const first = document.getElementsByTagName('script')[0];
  first.parentNode!.insertBefore(tag, first);
}

window.onYouTubeIframeAPIReady = () => {
  youtubeApiReady = true;
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    playerVars: {
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      autoplay: 1,
      playsinline: 1,
    },
    events: {
      onStateChange: onPlayerStateChange,
      onReady: onPlayerReady,
      onError: onPlayerError,
    },
  });
};

loadYouTubeAPI();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
