// Embedded Google Sheets Iframe Sources
const IFRAME_SOURCES = {
  etfs: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQUMru7EYeezAxCzyDbqbj5kwpcCI9nIVVqQb_UJY1nzkas55_rNOnps14ymD27awudy6qCFWEusI8h/pubhtml?widget=true&headers=false',
  stocks: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTEu63iygiqETe_-jsNgE2KbG6krw6JT7gjP615q0u5wZDceE6A8YOkANajGjuHwYpPIuadMIAdOHNQ/pubhtml?widget=true&headers=false'
};

// S&P 500 GICS Sub-Sector ETFs
const SP500_SECTORS = [
  { ticker: 'XLK', name: 'Technology' },
  { ticker: 'XLF', name: 'Financials' },
  { ticker: 'XLV', name: 'Health Care' },
  { ticker: 'XLY', name: 'Cons. Disc.' },
  { ticker: 'XLC', name: 'Comm. Svcs' },
  { ticker: 'XLI', name: 'Industrials' },
  { ticker: 'XLP', name: 'Cons. Staples' },
  { ticker: 'XLE', name: 'Energy' },
  { ticker: 'XLU', name: 'Utilities' },
  { ticker: 'XLRE', name: 'Real Estate' },
  { ticker: 'XLB', name: 'Materials' }
];

// Quick Finviz Chart Launcher Tickers (Macro + SMH + S&P 500 Sub-Sectors)
const QUICK_LAUNCHER_TICKERS = [
  'SPY', 'QQQ', 'RSP', 'DIA', 'IWM', 'IBIT', 'IVE', 'IVW', 'GLD', 'SMH',
  ...SP500_SECTORS.map(s => s.ticker)
];

// Daily Image Chart Gallery Tickers (SPY, QQQ, DIA, MDY, SMH + S&P 500 Sub-Sectors)
const CHART_GALLERY_ITEMS = [
  { ticker: 'SPY', name: 'S&P 500 ETF' },
  { ticker: 'QQQ', name: 'Nasdaq 100' },
  { ticker: 'DIA', name: 'Dow Jones Ind.' },
  { ticker: 'MDY', name: 'S&P MidCap 400' },
  { ticker: 'SMH', name: 'Semiconductors' },
  ...SP500_SECTORS
];

const TerminalUI = {
  scale: window.innerWidth < 640 ? 0.72 : 1,
  viewMode: 'split',
  galleryCollapsed: false,

  init() {
    this.renderQuickLauncher();
    this.renderChartGallery();
    this.setScale(this.scale);
    // Always default to showing both sheets on all screen sizes
    this.setViewMode('split');
    this.updateTimestamp();
  },

  getFinvizChartPageUrl(ticker) {
    return `https://finviz.com/stock?t=${encodeURIComponent(ticker)}&p=d`;
  },

  getFinvizImageUrl(ticker, bust = false) {
    const suffix = bust ? `&_t=${Date.now()}` : '';
    return `https://finviz.com/chart.ashx?t=${encodeURIComponent(ticker)}&ty=c&ta=1&p=d&s=l${suffix}`;
  },

  renderQuickLauncher() {
    const container = document.getElementById('quick-tickers-bar');
    if (!container) return;
    const sectorMap = Object.fromEntries(SP500_SECTORS.map(s => [s.ticker, s.name]));
    container.innerHTML = QUICK_LAUNCHER_TICKERS.map(ticker => {
      const label = sectorMap[ticker] ? ` · ${sectorMap[ticker]}` : (ticker === 'SMH' ? ' · Semis' : '');
      return `
        <a href="${this.getFinvizChartPageUrl(ticker)}" target="_blank" rel="noopener noreferrer"
           class="ticker-chip font-mono">
          <span>${ticker}</span>
          ${label ? `<span class="ticker-chip-sub">${label}</span>` : ''}
        </a>
      `;
    }).join('');
  },

  renderChartGallery(bust = false) {
    const gallery = document.getElementById('finviz-chart-gallery');
    if (!gallery) return;
    gallery.innerHTML = CHART_GALLERY_ITEMS.map(item => `
      <a href="${this.getFinvizChartPageUrl(item.ticker)}" target="_blank" rel="noopener noreferrer" class="chart-card">
        <div class="chart-card-head">
          <div class="chart-card-left">
            <span class="chart-card-ticker font-mono">${item.ticker}</span>
            <span class="chart-card-name">${item.name}</span>
          </div>
          <span class="chart-card-ext font-mono">Finviz ↗</span>
        </div>
        <div class="chart-img-box">
          <img src="${this.getFinvizImageUrl(item.ticker, bust)}"
               alt="${item.ticker} Daily Chart"
               loading="lazy"
               onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');" />
          <div class="hidden chart-fallback">
            Chart preview unavailable — click to open <strong style="color:#a5b4fc">${item.ticker}</strong> on Finviz ↗
          </div>
        </div>
      </a>
    `).join('');
  },

  toggleGallery() {
    this.galleryCollapsed = !this.galleryCollapsed;
    const body = document.getElementById('gallery-collapsible-body');
    const nav = document.getElementById('gallery-nav-controls');
    const header = document.getElementById('gallery-header-bar');
    const toggleBtn = document.getElementById('gallery-toggle-btn');
    const label = document.getElementById('gallery-toggle-label');
    const chevron = document.getElementById('gallery-chevron');

    if (body) body.classList.toggle('hidden', this.galleryCollapsed);
    if (nav) nav.classList.toggle('hidden', this.galleryCollapsed);
    if (header) header.classList.toggle('collapsed', this.galleryCollapsed);
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', String(!this.galleryCollapsed));
    if (label) label.textContent = this.galleryCollapsed ? 'Show' : 'Hide';
    if (chevron) chevron.classList.toggle('rotated', this.galleryCollapsed);
  },

  scrollGallery(direction) {
    const gallery = document.getElementById('finviz-chart-gallery');
    if (!gallery) return;
    gallery.scrollBy({ left: direction * 320, behavior: 'smooth' });
  },

  openFinvizLookup(event) {
    event.preventDefault();
    const desktopInput = document.getElementById('finviz-ticker-input');
    const mobileInput = document.getElementById('finviz-ticker-mobile');
    const raw = (desktopInput?.value || mobileInput?.value || '').trim().toUpperCase();
    if (!raw) return;
    window.open(this.getFinvizChartPageUrl(raw), '_blank', 'noopener,noreferrer');
    if (desktopInput) desktopInput.value = '';
    if (mobileInput) mobileInput.value = '';
  },

  setViewMode(mode) {
    this.viewMode = mode;
    const grid = document.getElementById('iframes-grid');
    const etfsSec = document.getElementById('etfs-section');
    const stocksSec = document.getElementById('stocks-section');

    if (grid && etfsSec && stocksSec) {
      if (mode === 'split') {
        grid.classList.add('split-active');
        etfsSec.classList.remove('hidden');
        stocksSec.classList.remove('hidden');
      } else if (mode === 'etfs') {
        grid.classList.remove('split-active');
        etfsSec.classList.remove('hidden');
        stocksSec.classList.add('hidden');
      } else {
        grid.classList.remove('split-active');
        etfsSec.classList.add('hidden');
        stocksSec.classList.remove('hidden');
      }
    }

    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === mode);
    });
  },

  setScale(scale) {
    this.scale = scale;
    const pct = `${(100 / scale).toFixed(2)}%`;

    ['etfs-iframe', 'stocks-iframe'].forEach(id => {
      const frame = document.getElementById(id);
      if (!frame) return;
      frame.style.width = pct;
      frame.style.height = pct;
      frame.style.transform = `scale(${scale})`;
    });

    document.querySelectorAll('.scale-btn').forEach(btn => {
      btn.classList.toggle('active', parseFloat(btn.dataset.scale) === scale);
    });
  },

  reloadSingleFrame(key) {
    const frame = document.getElementById(`${key}-iframe`);
    if (!frame || !IFRAME_SOURCES[key]) return;
    const sep = IFRAME_SOURCES[key].includes('?') ? '&' : '?';
    frame.src = `${IFRAME_SOURCES[key]}${sep}_cb=${Date.now()}`;
    this.updateTimestamp();
  },

  refreshAll() {
    const icon = document.getElementById('reload-icon');
    if (icon) {
      icon.classList.add('animate-spin');
      setTimeout(() => icon.classList.remove('animate-spin'), 700);
    }
    this.reloadSingleFrame('etfs');
    this.reloadSingleFrame('stocks');
    this.renderChartGallery(true);
  },

  updateTimestamp() {
    const el = document.getElementById('last-updated-text');
    if (!el) return;
    const now = new Date();
    el.textContent = `Synced ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
  }
};

window.addEventListener('DOMContentLoaded', () => TerminalUI.init());