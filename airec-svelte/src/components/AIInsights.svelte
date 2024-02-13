<script>
  import { onMount } from 'svelte';
  import { aiInsight, fetchAIInsight } from '../stores/aiInsightStore.js';
  import { user } from '../stores/userStore.js';
  import { login } from '../stores/authStore.js';


  let interestedStockTickers = ['AAPL', 'MSFT', 'TSLA'];
  let newTicker = '';

  onMount(() => {
    regenerateInsights();
  });

  //get credentials from localstorage and regenerate insights for investments
  async function regenerateInsights() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (userId && token) {
      await fetchAIInsight(userId, token, interestedStockTickers);
    }
  }

  // export async function loadInsights(userId, token) {
  //   await fetchAIInsight(userId, token, interestedStockTickers);
  // }
  
  //code for adding new ticker
  function handleAddTicker() {
    if (newTicker && !interestedStockTickers.includes(newTicker.toUpperCase())) {
      // interestedStockTickers.push(newTicker.toUpperCase());
      interestedStockTickers = [...interestedStockTickers, newTicker.toUpperCase()];
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      newTicker = '';
      regenerateInsights();
    }
  }

  //code for removing ticker
  function handleRemoveTicker(ticker) {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    interestedStockTickers = interestedStockTickers.filter(t => t !== ticker);
    interestedStockTickers = [...interestedStockTickers];
    regenerateInsights();
  }
</script>

<div class="ai-insights-container">
  <div class="ticker-input-container">
    <input class="ticker-input" type="text" bind:value={newTicker} placeholder="Add new ticker (e.g., GOOGL)" />
    <button class="add-ticker-btn" on:click={handleAddTicker}>Add Ticker</button>
  </div>
  
  {#if interestedStockTickers.length > 0}
    <div class="tickers-list">
      <h3>Your Interested Stock Tickers:</h3>
      <ul>
        {#each interestedStockTickers as ticker}
          <li class="ticker-item">
            {ticker} 
            <button class="remove-ticker-btn" on:click={() => handleRemoveTicker(ticker)}>Remove</button>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  
  <button class="regenerate-insights-btn" on:click={regenerateInsights}>Regenerate Insights</button>
  
  {#if $aiInsight}
    <div class="ai-insights">
      <h2>AI Insights</h2>
      <p>You should save: ${$aiInsight.savings}</p>
      {#each $aiInsight.investmentSuggestions as suggestion}
        <div class="suggestion">
          <p>Your suggested investment for {suggestion.ticker} is: ${suggestion.suggestedInvestment}.</p> 
        </div>
      {/each}
    </div>
  {:else}
    <p>Loading insights...</p>
  {/if}
</div>
  
<style>
    .ticker-input-container {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
  
    .ticker-input {
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ccc;
      border-radius: 4px;
      margin-right: 10px;
      flex-grow: 1;
    }
  
    .add-ticker-btn, .remove-ticker-btn {
      padding: 10px 20px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .add-ticker-btn:hover, .remove-ticker-btn:hover {
      background-color: #218838;
    }
  
    .tickers-list h3 {
      margin-bottom: 10px;
    }
  
    .tickers-list ul {
      list-style: none;
      padding: 0;
    }
  
    .ticker-item {
      background-color: #f8f9fa;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .ai-insights {
      margin-top: 30px;
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }
  
    .ai-insights h2 {
      margin-top: 0;
    }

    .regenerate-insights-btn {
    padding: 10px 20px;
    background-color: #1a73e8;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 20px; /* Add some spacing */
  }

  .regenerate-insights-btn:hover {
    background-color: #1669c7;
  }
</style>