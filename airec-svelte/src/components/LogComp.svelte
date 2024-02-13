<script>
    import { login } from '../stores/authStore.js';
  
    let username = '';
    let password = '';
  
    const handleLogin = async () => {
      await login(username, password);
    };
</script>
  
<form on:submit|preventDefault={handleLogin}>
  <div>
    <label for="username">Username:</label>
    <input type="username" id="username" bind:value={username} required />
  </div>
  <div>
    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required />
  </div>
  <button type="submit">Login</button>
</form>
  
<style>
    form {
        display: flex;
        flex-direction: column;
        width: 300px;
        margin: 0 auto;
    }

    div {
        margin-bottom: 1rem;
    }

    label {
        margin-bottom: 0.5rem;
    }

    input {
        padding: 0.5rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: 0.25rem;
        border: 1px solid #ddd;
    }

    button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        color: #fff;
        background-color: #007bff;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>
  