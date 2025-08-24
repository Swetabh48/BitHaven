from __future__ import annotations

import os
from typing import List, Optional, Dict
import pandas as pd
import yfinance as yf
from tqdm import tqdm

from src.config import RAW_DAILY_DIR, RAW_INTRADAY_DIR, DEFAULT_TICKERS


def _ensure_tickers(tickers: Optional[List[str]]) -> List[str]:
    return tickers if tickers else DEFAULT_TICKERS


def _save_parquet(df: pd.DataFrame, path: str) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    df.to_parquet(path)


def download_prices(
    tickers: Optional[List[str]] = None,
    include_intraday: bool = False,
    intraday_period: str = "60d",
) -> Dict[str, str]:
    """
    Download 50y daily OHLCV and optional intraday data using yfinance.
    Saves per-ticker parquet files under data/raw.
    Returns map of artifact descriptions to file paths.
    """
    tickers = _ensure_tickers(tickers)

    artifacts: Dict[str, str] = {}

    for ticker in tqdm(tickers, desc="Downloading daily data"):
        try:
            # 50 years daily
            df_daily = yf.Ticker(ticker).history(period="max", interval="1d", auto_adjust=False)
            if not df_daily.empty:
                df_daily = df_daily.reset_index().rename(columns={"index": "Date"})
                daily_path = os.path.join(RAW_DAILY_DIR.as_posix(), f"{ticker}.parquet")
                _save_parquet(df_daily, daily_path)
                artifacts[f"daily:{ticker}"] = daily_path
        except Exception as exc:
            print(f"Failed daily for {ticker}: {exc}")

    if include_intraday:
        for ticker in tqdm(tickers, desc="Downloading intraday data"):
            try:
                df_intra = yf.Ticker(ticker).history(period=intraday_period, interval="5m", auto_adjust=False)
                if not df_intra.empty:
                    df_intra = df_intra.reset_index().rename(columns={"index": "Datetime"})
                    intra_path = os.path.join(RAW_INTRADAY_DIR.as_posix(), f"{ticker}_5m.parquet")
                    _save_parquet(df_intra, intra_path)
                    artifacts[f"intraday:{ticker}"] = intra_path
            except Exception as exc:
                print(f"Failed intraday for {ticker}: {exc}")

    return artifacts