export function calculateRewards(amount) {
  if (amount > 100) {
    return (amount - 100) * 2 + 50;
  } else if (amount > 50) {
    return amount - 50;
  }
  return 0;
}

export function mapTransactionsWithRewards(transactions) {
  return transactions.map((transaction) => ({
    ...transaction,
    rewards: calculateRewards(transaction.amount),
  }));
}

export function getFilteredTransactions(
  customerFilter,
  monthFilter,
  transactions
) {
  if (transactions.length === 0) {
    return transactions;
  }
  let filteredTransactions = [...transactions];

  if (customerFilter !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.customer_id === customerFilter
    );
  }
  if (monthFilter !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (transaction) =>
        new Date(transaction.transaction_time).getMonth().toString() ===
        monthFilter
    );
  }
  return filteredTransactions;
}

export function sumRewards(transactions) {
  return transactions.reduce((acc, transaction) => {
    return acc + transaction.rewards;
  }, 0);
}
