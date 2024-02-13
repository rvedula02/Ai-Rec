import express from 'express';
import fetchData from '../modules/fetchData.js';
import insightGeneration from '../modules/insightGeneration.js';

const router = express.Router();

router.post('/generate-insight', async (req, res) => {
    try {
        console.log("here in generate insights")
        const { userId,token, interestedStockTickers } = req.body;
        const financialData = await fetchData.fetchUserFinancialData(userId, token);
        // console.log(financialData);
        const suggestions = await insightGeneration.generateInvestmentSuggestions(financialData, interestedStockTickers);
        // console.log(suggestions);
        fetch('http://localhost:3004/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'InsightGenerated', data: { userId: userId, interestedStockTickers } })
        });
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;