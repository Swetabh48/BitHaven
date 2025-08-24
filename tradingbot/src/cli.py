import argparse
import sys

from src.data.download import download_prices
from src.news.rss_sentiment import collect_and_score_news
from src.features.build_features import build_features_for_ticker
from src.models.train import train_models_for_ticker
from src.backtest.engine import run_backtest_for_ticker


def main(argv=None):
    parser = argparse.ArgumentParser(description="AI Trading Bot Pipeline (free stack)")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # download
    dl = subparsers.add_parser("download", help="Download historical price data via yfinance")
    dl.add_argument("--tickers", nargs="*", default=None, help="Tickers to download (default in config)")
    dl.add_argument("--include-intraday", action="store_true", help="Also fetch recent 5m intraday data")
    dl.add_argument("--intraday-period", default="60d", help="yfinance intraday period (e.g., 7d, 60d)")

    # news
    news = subparsers.add_parser("news", help="Fetch RSS news and compute sentiment")
    news.add_argument("--tickers", nargs="*", default=None, help="Tickers to collect news for")
    news.add_argument("--window-days", type=int, default=30, help="How many past days to fetch")

    # features
    feat = subparsers.add_parser("build-dataset", help="Build features and labeled dataset")
    feat.add_argument("--ticker", required=True, help="Ticker to build dataset for")

    # train
    train = subparsers.add_parser("train", help="Train ML models on prepared dataset")
    train.add_argument("--ticker", required=True, help="Ticker to train on")

    # backtest
    bt = subparsers.add_parser("backtest", help="Run backtest using trained model")
    bt.add_argument("--ticker", required=True, help="Ticker to backtest")
    bt.add_argument("--model", default="rf", choices=["rf", "lr"], help="Model type to use")
    bt.add_argument("--threshold", type=float, default=0.55, help="Long if prob >= threshold; else flat")
    bt.add_argument("--fee-bps", type=float, default=1.0, help="Round-trip fee in basis points")

    args = parser.parse_args(argv)

    if args.command == "download":
        return download_prices(args.tickers, include_intraday=args.include_intraday, intraday_period=args.intraday_period)
    elif args.command == "news":
        return collect_and_score_news(args.tickers, window_days=args.window_days)
    elif args.command == "build-dataset":
        return build_features_for_ticker(args.ticker)
    elif args.command == "train":
        return train_models_for_ticker(args.ticker)
    elif args.command == "backtest":
        return run_backtest_for_ticker(args.ticker, model_choice=args.model, prob_threshold=args.threshold, fee_bps=args.fee_bps)


if __name__ == "__main__":
    main(sys.argv[1:])