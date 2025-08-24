from __future__ import annotations

import os
import datetime as dt
from typing import List, Optional
import pandas as pd
import feedparser
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk

from src.config import NEWS_DATA_DIR, DEFAULT_TICKERS

# Ensure VADER lexicon
try:
    nltk.data.find('sentiment/vader_lexicon.zip')
except LookupError:
    nltk.download('vader_lexicon', quiet=True)


RSS_SOURCES = [
    "https://feeds.a.dj.com/rss/RSSMarketsMain.xml",  # WSJ Markets
    "https://www.investing.com/rss/news.rss",
    "https://finance.yahoo.com/news/rssindex",
]


def _ensure_tickers(tickers: Optional[List[str]]) -> List[str]:
    return tickers if tickers else DEFAULT_TICKERS


def _collect_articles(window_days: int) -> pd.DataFrame:
    cutoff = dt.datetime.utcnow() - dt.timedelta(days=window_days)
    rows = []
    for url in RSS_SOURCES:
        feed = feedparser.parse(url)
        for entry in feed.entries:
            published = None
            if hasattr(entry, 'published_parsed') and entry.published_parsed:
                published = dt.datetime(*entry.published_parsed[:6])
            elif hasattr(entry, 'updated_parsed') and entry.updated_parsed:
                published = dt.datetime(*entry.updated_parsed[:6])
            else:
                published = dt.datetime.utcnow()
            if published < cutoff:
                continue
            rows.append({
                "title": getattr(entry, 'title', ''),
                "summary": getattr(entry, 'summary', ''),
                "link": getattr(entry, 'link', ''),
                "published": published,
            })
    return pd.DataFrame(rows)


def _score_sentiment(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        return df
    sia = SentimentIntensityAnalyzer()
    texts = (df["title"].fillna("") + ". " + df["summary"].fillna(""))
    scores = texts.apply(sia.polarity_scores)
    sent_df = pd.DataFrame(list(scores))
    return pd.concat([df.reset_index(drop=True), sent_df], axis=1)


def _assign_tickers(df: pd.DataFrame, tickers: List[str]) -> pd.DataFrame:
    if df.empty:
        return df
    # naive ticker tagging: if ticker appears in title or summary
    def match_row(row):
        text = f"{row['title']} {row['summary']}".upper()
        hits = [t for t in tickers if t in text]
        return hits if hits else ["MARKET"]
    df["tickers"] = df.apply(match_row, axis=1)
    df = df.explode("tickers")
    return df


def collect_and_score_news(tickers: Optional[List[str]] = None, window_days: int = 30):
    tickers = _ensure_tickers(tickers)
    raw = _collect_articles(window_days)
    scored = _score_sentiment(raw)
    tagged = _assign_tickers(scored, tickers)

    os.makedirs(NEWS_DATA_DIR, exist_ok=True)
    out_path = NEWS_DATA_DIR / f"news_{dt.datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.parquet"
    tagged.to_parquet(out_path)
    return {"news": out_path.as_posix(), "rows": len(tagged)}