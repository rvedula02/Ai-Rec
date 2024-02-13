<script>
    import { get } from 'svelte/store';
    import { getToken, transactions } from '../stores/userStore.js';
    import { createEventDispatcher } from 'svelte';
    
    export let selectedTransaction;
    export let onDoneUpdating;
    // console.log("in component update")
    // console.log(selectedTransaction)
    let { userId, description, date, amount, type } = selectedTransaction || {};

    async function updateTransaction() {
        let token = getToken();
        const response = await fetch(`http://localhost:3002/transactions/${selectedTransaction._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId, date, type, description, amount })
        });
        
        if (response.ok) {
            const updatedTransaction = await response.json();
            transactions.update(ts => ts.map(t => t._id === updatedTransaction._id ? updatedTransaction : t));
            onDoneUpdating();
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'An error occurred while updating the transaction.');
        }
    }

    async function deleteTransaction() {
        let token = getToken();
        if (confirm('Are you sure you want to delete this transaction?')) {
            const response = await fetch(`http://localhost:3002/transactions/${selectedTransaction._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                transactions.update(ts => ts.filter(t => t._id !== selectedTransaction._id));
                onDoneUpdating();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'An error occurred while deleting the transaction.');
            }
        }
    }
</script>

<form on:submit|preventDefault={updateTransaction}>
    <input type="text" bind:value={description} placeholder="Description" />
    <input type="number" bind:value={amount} placeholder="Amount" />
    <input type="date" bind:value={date} />
    <select bind:value={type}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
    </select>
    <button type="submit">Update Transaction</button>
    <button type="button" on:click={deleteTransaction}>Delete Transaction</button>
</form>
