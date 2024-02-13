<script>
    import { user, getToken } from '../stores/userStore.js';
    import { transactions, fetchTransactions } from '../stores/userStore.js';

 
    let description = '';
    let amount = 0;
    let type = 'expense';
    let date = '';

    async function addTransaction() {
        let token = getToken();
        let userId = localStorage.getItem('userId');
        
        const response = await fetch('http://localhost:3002/transactions', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId, date, type, description, amount })
        });
        
        if (response.ok) {
            const newTransaction = await response.json();
            transactions.update(currentTransactions => {
                return [newTransaction, ...currentTransactions];
            });
            
            description = '';
            amount = 0;
            type = 'expense';
            
        } else {
            const errorData = await response.json();
            message.set(errorData.message || 'An error occurred while adding the transaction.');
        }
    }
  </script>
  
  <form on:submit|preventDefault={addTransaction}>
    <input type="text" bind:value={description} placeholder="Description" required>
    <input type="number" bind:value={amount} placeholder="Amount" required>
    <select bind:value={type}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
    </select>
    <input type="date" bind:value={date} required> 
    <button type="submit">Add Transaction</button>
</form>
  