<script>
  import { onMount } from 'svelte';
  import { user, fetchUser } from '../stores/userStore.js';
  import Register from '../components/regComp.svelte';
  import Login from '../components/LogComp.svelte';
  import Header from '../components/Header.svelte'
  import { isAuthenticated } from '../stores/authStore.js';
  import Footer from '../components/Footer.svelte';
  import TransactionList from '../components/TransactionList.svelte';
  import UserProfile from '../components/UserProfile.svelte';
  import AiInsights from '../components/AIInsights.svelte';
  import Home from '../components/Home.svelte';
  import CreateTransaction from '../components/createTransaction.svelte';
  import UpdateTransaction from '../components/updateTransaction.svelte';
  import { writable } from 'svelte/store';

  let selectedTransaction = null;

    function onSelectTransaction(event) {
      // console.log("in helper")
      selectedTransaction = event.detail;
      // console.log(selectedTransaction);
    }

    function onDoneUpdating() {
      // console.log("here");
      selectedTransaction = null;
    }
</script>

<Header />

<div class="auth-container">
  {#if !$isAuthenticated}
    <Home />
    <div class="form-container">
      <h2>Login</h2>
      <Login />
    </div>
    <div class="form-container">
      <h2>Register</h2>
      <Register />
    </div>
  {:else}
    <div class="main-container">
      <UserProfile />
      <div class="transaction-section">
        
        <TransactionList on:selectTransaction={onSelectTransaction}/>
        {#if selectedTransaction}
          <UpdateTransaction {selectedTransaction}{onDoneUpdating}/>
        {:else}
          <CreateTransaction />
        {/if}
      </div>
      <div class="ai-insight-section">
        <AiInsights />
      </div>
    </div>
  {/if}
</div>

<!-- <footer>
  <Footer />
</footer> -->

<style>
  .main-container {
    display: flex;
    flex-direction: column; 
    align-items: center; 
    gap: 2rem; 
    padding: 2rem;
  }

  .transaction-section, .ai-insight-section {
    background: #f9f9f9;
    padding: 1rem; 
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    width: 100%; 
    max-width: 800px; 
    box-sizing: border-box; 
  }

  .auth-container {
    display: flex;
    flex-direction: column;
    align-items: center; 
    gap: 1rem;
    padding: 1rem;
  }
  
  .form-container {
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 400px;
    box-sizing: border-box; 
  }

  footer {
    width: 100%;
  }

  .divider {
    height: 1px;
    background: #e0e0e0;
    margin: 1rem 0; 
  }

  h2 {
    text-align: center;
    color: #333;
  }
</style>
