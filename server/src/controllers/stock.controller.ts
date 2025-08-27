import yahooFinance from "yahoo-finance2";

const stockController = {
  getStockData: async (req, res) => {
    try {
      // Get symbols from query or body
      // Example: /api/stocks?symbols=HDFCBANK.NS,BAJFINANCE.NS
      const { symbols } = req.query;

      if (!symbols) {
        return res.status(400).json({ error: "Please provide stock symbols" });
      }

      const symbolList = symbols.split(",").map((s) => s.trim());

      // Fetch all stocks in parallel
      const results = await Promise.all(
        symbolList.map((symbol) => yahooFinance.quote(symbol))
      );

      // Format response for frontend
      const formatted = results.map((stock) => ({
        symbol: stock.symbol,
        name: stock.shortName,
        price: stock.regularMarketPrice,
        change: stock.regularMarketChange,
        changePercent: stock.regularMarketChangePercent,
        dayLow: stock.regularMarketDayLow,
        dayHigh: stock.regularMarketDayHigh,
        marketCap: stock.marketCap,
        peRatio: stock.trailingPE,
        dividendYield: stock.dividendYield,
      }));

      res.status(200).json({ stocks: formatted });
    } catch (error) {
      console.error("Error fetching stock data:", error);
      res.status(500).json({ error: "Failed to fetch stock data" });
    }
  },
};

export { stockController };

