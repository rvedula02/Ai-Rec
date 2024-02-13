const estimateInvestmentCapacity = (financialData) => {
    let totalIncome = 0;
    let totalExpenses = 0;
    let monthSet = new Set();

    financialData.forEach(transaction => {
        // console.log(transaction);
        const transactionDate = new Date(transaction.date);
        const monthYear = `${transactionDate.getUTCMonth() + 1}-${transactionDate.getUTCFullYear()}`;
        // console.log(monthYear);
        monthSet.add(monthYear);

        if (transaction.type === 'income') {
            // console.log("current total income is: ", totalIncome);
            // console.log("transaction amount is: ", transaction.amount);

            totalIncome += transaction.amount;
        } else if (transaction.type === 'expense') {
            totalExpenses += transaction.amount;
            // console.log("current total expense is: ", totalExpenses);
            // console.log("transaction amount is: ", transaction.amount);
        }
    });

    const numberOfMonths = monthSet.size;
    if (numberOfMonths === 0) return { error: 'No transactions for current month' };
    // console.log(monthSet);
    const averageSavingsPerMonth = (totalIncome - totalExpenses) / numberOfMonths;
    const savingsPercentage = 0.3; 
    const investmentPercentage = 1 - savingsPercentage; 

    const savings = Math.max(0, averageSavingsPerMonth * savingsPercentage);
    // console.log("check this", averageSavingsPerMonth * savingsPercentage);
    const investmentCapacity = Math.max(0, averageSavingsPerMonth * investmentPercentage);
    
    return { savings, investmentCapacity };
};

export default { estimateInvestmentCapacity };
