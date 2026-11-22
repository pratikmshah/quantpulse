# QuantPulse — Market & ETF Terminal

A lightweight, single-file, mobile-friendly market terminal built with Tailwind CSS. It embeds a live Google Sheets dashboard alongside a quick-launch Finviz ticker bar and a side-scrollable gallery of daily S&P 500 sub-sector and macro ETF charts.

## Features

- **Responsive Google Sheets Embed**: Includes Mobile Fit (`72%`), Compact (`85%`), and `100%` view scaling, plus fullscreen expand and one-click refresh.
- **Quick Finviz Launcher**: Instant chart links (`finviz.com/stock?t=TICKER&p=d`) for macro ETFs (`SPY`, `QQQ`, `RSP`, `DIA`, `IWM`, `IBIT`, `IVE`, `IVW`, `GLD`, `SMH`) and all 11 S&P 500 sub-sectors (`XLK`, `XLF`, `XLV`, `XLY`, `XLC`, `XLI`, `XLP`, `XLE`, `XLU`, `XLRE`, `XLB`), plus a custom ticker search bar.
- **Side-Scrollable Daily Chart Strip**: Live daily technical chart thumbnails for `SPY`, `QQQ`, `DIA`, `MDY`, `SMH`, and all S&P 500 sub-sector ETFs.
- **Zero Build Step**: Self-contained in `index.html` with CDN Tailwind CSS—no backend or build pipeline required.

## Repository Structure

```text
├── index.html      # Complete self-contained dashboard application
├── .gitignore      # Standard OS, editor, and environment ignores
└── README.md       # Project overview and GitHub Pages setup guide
```

## Deploying to GitHub Pages

1. Upload `index.html`, `.gitignore`, and `README.md` to the root of a GitHub repository.
2. Open your repository on GitHub and navigate to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **Deploy from a branch**.
4. Choose your `main` branch and `/ (root)` folder, then click **Save**.
5. Your live dashboard will be available within 1–2 minutes at `https://<your-username>.github.io/<repository-name>/`.