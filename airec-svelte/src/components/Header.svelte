<script>
  import { isAuthenticated, logout } from '../stores/authStore.js';

  // Function to handle logout
  function handleLogout() {
    logout();
  }
</script>

<header>
  <nav>
    <center><h1>AI-Rec</h1></center>
    {#if $isAuthenticated}
      <button on:click={handleLogout}>Logout</button>      
    {/if}
  </nav>
</header>

<style>
  header {
    background-color: #333;
    padding: 1rem;
  }
  nav a, nav button {
    color: white;
    text-decoration: none;
    margin-right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: inherit;
  }
  nav a:hover, nav button:hover {
    text-decoration: underline;
  }
  h1 {
    color: whitesmoke;
  }
</style>
