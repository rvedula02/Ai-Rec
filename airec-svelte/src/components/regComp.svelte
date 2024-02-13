<script>
    import { goto } from '$app/navigation';
    import { login } from '../stores/authStore.js';


    let email = '';
    let name = '';
    let username = '';
    let password = '';
  
    const handleRegister = async () => {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, name, email, password })
      });
  
      if (response.ok) {
        await login(username, password);
      } else {
        const error = await response.json();
        alert(error.message);
      }
    };
  </script>
  
  <form on:submit|preventDefault={handleRegister}>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} required />
    </div>
    <div>
      <label for="RegUsername">Username:</label>
      <input type="text" id="RegUsername" bind:value={username} required />
    </div>
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" bind:value={name} required />
    </div>
    <div>
      <label for="RegPassword">Password:</label>
      <input type="text" id="RegPassword" bind:value={password} required />
    </div>
    <button type="submit">Register</button>
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
  