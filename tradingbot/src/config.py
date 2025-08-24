import os
from pathlib import Path

# Project paths
PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = PROJECT_ROOT / "data"
RAW_DATA_DIR = DATA_DIR / "raw"
RAW_DAILY_DIR = RAW_DATA_DIR / "daily"
RAW_INTRADAY_DIR = RAW_DATA_DIR / "intraday"
NEWS_DATA_DIR = DATA_DIR / "news"
PROCESSED_DATA_DIR = DATA_DIR / "processed"
MODELS_DIR = PROJECT_ROOT / "models"
REPORTS_DIR = PROJECT_ROOT / "reports" / "backtests"

for directory in [
    DATA_DIR,
    RAW_DATA_DIR,
    RAW_DAILY_DIR,
    RAW_INTRADAY_DIR,
    NEWS_DATA_DIR,
    PROCESSED_DATA_DIR,
    MODELS_DIR,
    REPORTS_DIR,
]:
    os.makedirs(directory, exist_ok=True)

# Defaults
DEFAULT_TICKERS = [
    "SPY",
    "QQQ",
    "DIA",
    "AAPL",
    "MSFT",
    "AMZN",
    "GOOGL",
    "META",
    "NVDA",
]

RANDOM_SEED = 42