import yahooFinance from 'yahoo-finance';

const calculateVolatility = (historicalData) => {
    const mean = historicalData.reduce((acc, cur) => acc + cur.close, 0) / historicalData.length;
    const variance = historicalData.reduce((acc, cur) => acc + Math.pow(cur.close - mean, 2), 0) / historicalData.length;
    return Math.sqrt(variance); // Standard deviation
};

const fetchStockData = async (ticker) => {
    try {
        const historicalData = await yahooFinance.historical({
            symbol: ticker,
            from: '2023-01-01',
            to: '2023-12-31',
            period: 'd'
        });

        const averageClosing = historicalData.reduce((acc, cur) => acc + cur.close, 0) / historicalData.length;
        const volatility = calculateVolatility(historicalData);

        return { ticker, averageClosing, volatility };
    } catch (error) {
        console.error(`Error fetching data for ${ticker}:`, error);
        return { ticker, averageClosing: 0, volatility: 0 };
    }
};

const analyzeStocks = async (interestedStockTickers) => {
    const stockDataPromises = interestedStockTickers.map(fetchStockData);
    const stockData = await Promise.all(stockDataPromises);
    return stockData;
};

export default { analyzeStocks };
