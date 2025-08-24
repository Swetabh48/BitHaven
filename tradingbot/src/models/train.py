from __future__ import annotations

import os
from typing import Tuple
import joblib
import pandas as pd
from sklearn.model_selection import TimeSeriesSplit
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score, accuracy_score

from src.config import PROCESSED_DATA_DIR, MODELS_DIR


FEATURE_COLUMNS_EXCLUDE = {"date", "Open", "High", "Low", "Close", "Volume", "Dividends", "Stock Splits", "target_up_1d"}


def _load_dataset(ticker: str) -> pd.DataFrame:
    path = (PROCESSED_DATA_DIR / ticker / "dataset.parquet").as_posix()
    if not os.path.exists(path):
        raise FileNotFoundError(f"Dataset not found for {ticker}. Run build-dataset first.")
    return pd.read_parquet(path)


def _split_features_labels(df: pd.DataFrame) -> Tuple[pd.DataFrame, pd.Series]:
    y = df["target_up_1d"].astype(int)
    X = df[[c for c in df.columns if c not in FEATURE_COLUMNS_EXCLUDE]].copy()
    return X, y


def _cv_scores(model: Pipeline, X: pd.DataFrame, y: pd.Series, splits: int = 5) -> dict:
    tscv = TimeSeriesSplit(n_splits=splits)
    aucs, accs = [], []
    for train_idx, test_idx in tscv.split(X):
        X_train, X_test = X.iloc[train_idx], X.iloc[test_idx]
        y_train, y_test = y.iloc[train_idx], y.iloc[test_idx]
        model.fit(X_train, y_train)
        prob = model.predict_proba(X_test)[:, 1]
        pred = (prob >= 0.5).astype(int)
        aucs.append(roc_auc_score(y_test, prob))
        accs.append(accuracy_score(y_test, pred))
    return {"auc_mean": float(pd.Series(aucs).mean()), "acc_mean": float(pd.Series(accs).mean())}


def train_models_for_ticker(ticker: str):
    df = _load_dataset(ticker)
    X, y = _split_features_labels(df)

    lr = Pipeline([
        ("scaler", StandardScaler()),
        ("clf", LogisticRegression(max_iter=1000, n_jobs=1))
    ])
    rf = Pipeline([
        ("clf", RandomForestClassifier(n_estimators=400, max_depth=None, random_state=42, n_jobs=-1))
    ])

    lr_scores = _cv_scores(lr, X, y)
    rf_scores = _cv_scores(rf, X, y)

    # Fit on full data
    lr.fit(X, y)
    rf.fit(X, y)

    os.makedirs(MODELS_DIR / ticker, exist_ok=True)
    lr_path = (MODELS_DIR / ticker / "model_lr.joblib").as_posix()
    rf_path = (MODELS_DIR / ticker / "model_rf.joblib").as_posix()
    joblib.dump(lr, lr_path)
    joblib.dump(rf, rf_path)

    return {"lr": {"path": lr_path, **lr_scores}, "rf": {"path": rf_path, **rf_scores}}