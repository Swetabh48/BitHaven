from __future__ import annotations

import os
from typing import Literal
import pandas as pd
import numpy as np
import joblib

from src.config import PROCESSED_DATA_DIR, MODELS_DIR, REPORTS_DIR
from src.models.train import FEATURE_COLUMNS_EXCLUDE


def _load_dataset(ticker: str) -> pd.DataFrame:
    path = (PROCESSED_DATA_DIR / ticker / "dataset.parquet").as_posix()
    if not os.path.exists(path):
        raise FileNotFoundError(f"Dataset not found for {ticker}. Run build-dataset first.")
    return pd.read_parquet(path)


def _feature_matrix(df: pd.DataFrame) -> pd.DataFrame:
    return df[[c for c in df.columns if c not in FEATURE_COLUMNS_EXCLUDE]].copy()


def _load_model(ticker: str, model_choice: Literal["rf", "lr"]) -> str:
    model_path = (MODELS_DIR / ticker / f"model_{model_choice}.joblib").as_posix()
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model not found at {model_path}. Run train first.")
    return model_path


def run_backtest_for_ticker(
    ticker: str,
    model_choice: Literal["rf", "lr"] = "rf",
    prob_threshold: float = 0.55,
    fee_bps: float = 1.0,
):
    df = _load_dataset(ticker)
    X = _feature_matrix(df)
    model_path = _load_model(ticker, model_choice)
    model = joblib.load(model_path)

    prob = model.predict_proba(X)[:, 1]
    position = (prob >= prob_threshold).astype(int)  # 1 long, 0 flat

    # Daily returns from close-to-close
    rets = df["Close"].pct_change().fillna(0.0).values
    pos_shifted = np.roll(position, 1)  # apply today's position on next-day return
    pos_shifted[0] = 0

    gross = pos_shifted * rets

    # Transaction costs when position changes (bps round-trip assumed when change occurs)
    changes = np.abs(np.diff(pos_shifted, prepend=0))
    tc = changes * (fee_bps / 10000.0)
    net = gross - tc

    equity = (1.0 + pd.Series(net)).cumprod()

    # Metrics
    total_return = float(equity.iloc[-1] - 1.0)
    ann_factor = 252.0
    ann_ret = float((1.0 + pd.Series(net)).prod() ** (ann_factor / max(1, len(net))) - 1.0)
    ann_vol = float(pd.Series(net).std() * np.sqrt(ann_factor))
    sharpe = float(ann_ret / ann_vol) if ann_vol > 0 else 0.0
    max_dd = float((equity / equity.cummax() - 1.0).min())
    win_rate = float((net > 0).mean())

    report = pd.DataFrame({
        "date": df["date"],
        "close": df["Close"],
        "prob": prob,
        "position": position,
        "ret": rets,
        "net": net,
        "equity": equity,
    })

    os.makedirs(REPORTS_DIR / ticker, exist_ok=True)
    out_path = (REPORTS_DIR / ticker / f"bt_{model_choice}_thr{prob_threshold:.2f}.parquet").as_posix()
    report.to_parquet(out_path)

    return {
        "report": out_path,
        "metrics": {
            "total_return": total_return,
            "ann_return": ann_ret,
            "ann_vol": ann_vol,
            "sharpe": sharpe,
            "max_drawdown": max_dd,
            "win_rate": win_rate,
        },
    }