# AI Trading Bot (Free Stack)

End-to-end pipeline for collecting market data, ingesting news, building features, training ML models, and backtesting.

## Features
- 50y daily OHLCV via yfinance (free)
- Optional recent intraday (5m)
- RSS news ingestion with VADER sentiment
- Technical indicators and dataset builder
- ML models: Logistic Regression, Random Forest
- Simple backtest with fees and metrics

## Install
```bash
cd tradingbot
python3 -m venv .venv
source .venv/bin/activate
pip install -U pip
pip install -r requirements.txt
```

## Usage
```bash
# 1) Download prices (daily max history)
python -m src.cli download --tickers AAPL MSFT NVDA --include-intraday --intraday-period 60d

# 2) Collect news + sentiment
python -m src.cli news --tickers AAPL MSFT NVDA --window-days 30

# 3) Build dataset
python -m src.cli build-dataset --ticker AAPL

# 4) Train models
python -m src.cli train --ticker AAPL

# 5) Backtest
python -m src.cli backtest --ticker AAPL --model rf --threshold 0.55 --fee-bps 1.0
```

Artifacts:
- `data/raw/daily/{T}.parquet`, `data/raw/intraday/{T}_5m.parquet`
- `data/news/news_*.parquet`
- `data/processed/{T}/dataset.parquet`
- `models/{T}/model_{lr,rf}.joblib`
- `reports/backtests/{T}/bt_*.parquet`

## Notes
- Educational only; not financial advice. Real trading is risky.
- Free sources may be rate-limited and noisy; validate and complement as needed.
- Extend with better labeling, cross-asset features, alternative data, walk-forward, and position sizing.