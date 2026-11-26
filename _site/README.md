# QuantPulse — Mobile-Friendly Market & ETF Terminal

A lightweight, static web dashboard built for mobile and desktop browsers. It embeds live published Google Sheets for **Macro & Sector ETFs** and **Stocks & Market Leaders**, pairs them with a collapsible, side-scrollable **Finviz Daily Chart Gallery**, and provides one-tap Finviz chart links with zero build step or external CSS CDN required.

## Project Structure

- `index.html` — Semantic page layout and embedded Google Sheets iframes.
- `styles.css` — Self-contained dark-mode responsive stylesheet.
- `app.js` — Interactive view switcher, zoom scaling, collapsible chart strip, and Finviz launcher logic.
- `.gitignore` — Standard ignore rules for GitHub repositories.

## Features

- **Dual Google Sheets Embeds (Both Sheets by Default)**: Displays both **Macro & Sector ETFs** and **Stocks & Market Leaders** by default across mobile and desktop, with optional single-sheet focus (`1. ETFs` / `2. Stocks`) and Mobile Fit (`72%`), Compact (`85%`), and `100%` view scaling.
- **Collapsible Daily Market & Sector Pulse**: Side-scrollable Finviz daily chart previews (`finviz.com/chart.ashx`) for major index ETFs, semiconductors (`SMH`), and all 11 S&P 500 sub-sectors with one-click Hide/Show toggle.
- **Quick Finviz Launcher**: Instant chart links (`finviz.com/stock?t=TICKER&p=d`) for macro ETFs and all 11 S&P 500 sub-sectors, plus a custom ticker search bar.

## Deploying to GitHub Pages (Free)

1. Upload `index.html`, `styles.css`, `app.js`, `.gitignore`, and `README.md` to the root of a GitHub repository.
2. Open your repository's **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Select the **`main`** branch and **`/ (root)`** folder, then click **Save**.
5. Your terminal will go live at `https://<your-username>.github.io/<repo-name>/`.