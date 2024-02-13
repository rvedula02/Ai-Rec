import financialAnalysis from './financialAnalysis.js';
import stockAnalysis from './stockAnalysis.js';

const generateInvestmentSuggestions = async (financialData, interestedStockTickers) => {
    const { savings, investmentCapacity, error } = financialAnalysis.estimateInvestmentCapacity(financialData);
    console.log(savings);
    console.log(investmentCapacity);
    if (error) {
        return { error };
    }
    const stockData = await stockAnalysis.analyzeStocks(interestedStockTickers);
    // console.log("stock data: ", stockData);

    const totalScore = stockData.reduce((acc, stock) => acc + (stock.averageClosing / stock.volatility), 0);
    const investmentSuggestions = stockData.map(stock => {
        const score = (stock.averageClosing / stock.volatility) / totalScore;
        const suggestedInvestment = score * investmentCapacity;
        return { ticker: stock.ticker, suggestedInvestment: suggestedInvestment.toFixed(2), volatility: stock.volatility };
    });
    // console.log("investment suggestions: ", investmentSuggestions);
    return { savings, investmentSuggestions }
};

export default { generateInvestmentSuggestions };
