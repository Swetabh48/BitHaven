from __future__ import annotations

import os
from typing import Optional
import pandas as pd
import numpy as np
from ta.momentum import RSIIndicator
from ta.trend import SMAIndicator, MACD
from ta.volatility import BollingerBands

from src.config import RAW_DAILY_DIR, PROCESSED_DATA_DIR


def _load_daily(ticker: str) -> pd.DataFrame:
    path = (RAW_DAILY_DIR / f"{ticker}.parquet").as_posix()
    if not os.path.exists(path):
        raise FileNotFoundError(f"Daily data not found for {ticker}. Run download first.")
    return pd.read_parquet(path)


def _compute_indicators(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df = df.rename(columns={"Date": "date"})
    df["date"] = pd.to_datetime(df["date"])  # ensure timezone-naive

    close = df["Close"].astype(float)
    high = df["High"].astype(float)
    low = df["Low"].astype(float)

    df["ret_1d"] = close.pct_change()
    df["ret_5d"] = close.pct_change(5)
    df["vol_20d"] = close.pct_change().rolling(20).std() * np.sqrt(252)

    df["sma_10"] = SMAIndicator(close, window=10).sma_indicator()
    df["sma_20"] = SMAIndicator(close, window=20).sma_indicator()
    df["sma_50"] = SMAIndicator(close, window=50).sma_indicator()
    df["rsi_14"] = RSIIndicator(close, window=14).rsi()

    macd = MACD(close)
    df["macd"] = macd.macd()
    df["macd_signal"] = macd.macd_signal()

    bb = BollingerBands(close, window=20, window_dev=2)
    df["bb_high"] = bb.bollinger_hband()
    df["bb_low"] = bb.bollinger_lband()
    df["bb_width"] = (df["bb_high"] - df["bb_low"]) / close

    # Forward-looking label: next-day positive return
    df["target_up_1d"] = (close.shift(-1) / close - 1.0) > 0.0

    # Drop rows with NaNs from indicators
    df = df.dropna().reset_index(drop=True)
    return df


def build_features_for_ticker(ticker: str):
    df = _load_daily(ticker)
    feats = _compute_indicators(df)

    out_dir = PROCESSED_DATA_DIR / ticker
    os.makedirs(out_dir, exist_ok=True)
    out_path = (out_dir / "dataset.parquet").as_posix()
    feats.to_parquet(out_path)
    return {"dataset": out_path, "rows": len(feats)}