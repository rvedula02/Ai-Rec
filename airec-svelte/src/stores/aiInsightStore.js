import { writable } from 'svelte/store';

export const aiInsight = writable(null);

export const fetchAIInsight = async (userId, token, interestedStockTickers) => {
  try {
    const response = await fetch('http://localhost:3003/ai/generate-insight', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId, token, interestedStockTickers })
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      aiInsight.set(data);
    } else {
      throw new Error('Failed to fetch AI Insight');
    }
  } catch (error) {
    console.error('Failed to fetch AI Insight:', error);
  }
};
