<script>
    import { onMount } from 'svelte';
    import { transactions, fetchTransactions } from '../stores/userStore.js';
    import { createEventDispatcher } from 'svelte';

    onMount(() => {
      fetchTransactions();
    });

    // export let onSelectTransaction;

    const dispatch = createEventDispatcher();

    function handleTransactionClick(transaction) {
      // console.log("initial", transaction);
      // console.log("here");
      dispatch('selectTransaction', transaction);
    }

    // function handleTransactionClickTwo(transaction) {
    //   // console.log("initial", transaction);
    //   // console.log("here");
    //   dispatch('doneTransaction', transaction);
    // }

    function formatDateTime(dateTimeString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateTimeString).toLocaleDateString('en-US', options);
    }
    // console.log($transactions.length)
  </script>

{#if $transactions.length > 0}
  <div class="transaction-list">
    <h2>Transactions</h2>
    <ul>
      {#each $transactions as transaction}
        <li on:click={() => handleTransactionClick(transaction)}>
            <time>{formatDateTime(transaction.date)}</time> - 
            {transaction.type || 'Undefined'} - 
            {transaction.description} - 
            ${transaction.amount}
        </li>
      {/each}
    </ul>
  </div>
{:else}
  <p>No transactions found.</p>
{/if}

<style>
  .transaction-list {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
  }
  h2 {
    color: #333333;
    font-size: 1.5em;
    margin-bottom: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    color: #555555;
  }
  time {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333333;
  }
</style>