import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);
export const authToken = writable('');

export const login = async (username, password) => {
    try {
      // console.log("in login authstore.js");
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        console.log("setting store variables here");
        authToken.set(data.token);
        isAuthenticated.set(true);
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      isAuthenticated.set(false);
    }
};

export const logout = () => {
  localStorage.removeItem('token'); 
  authToken.set(''); 
  isAuthenticated.set(false); 
};
