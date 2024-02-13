import { writable } from 'svelte/store';

export const user = writable(null);
export const transactions = writable([]);

export const getToken = () => {
    // console.log(localStorage.getItem('token'));
    return localStorage.getItem('token'); 
};

export const fetchUser = async () => {
  // console.log("here in fetchUser");
    const token = getToken();
    const username = localStorage.getItem('username');
    if (!token || !username) {
      console.error('Token or username not found');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/users/username/${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data)
        user.set(data);
        // console.log(user);
        localStorage.setItem('userId', data._id);
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };
  
export const fetchTransactions = async () => {
    const token = getToken();
    if (!token) {
      console.error('No token found');
      return;
    }
    try {
        const userId = localStorage.getItem('userId')
        const response = await fetch(`http://localhost:3002/users/${userId}`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
        const data = await response.json();
        transactions.set(data);
        }
    } catch (error) {
    console.error('Failed to fetch transactions:', error);
    }
};
