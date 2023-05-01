import mockData from "./mockData";

function calculateRewards(amount) {
  if (amount > 100) {
    return (amount - 100) * 2 + 50;
  } else if (amount > 50) {
    return amount - 50;
  }
  return 0;
}

export async function getTransactions() {
  return mockData.transaction;
}

export async function getTransactionsWithRewards() {
  const transactions = await getTransactions();

  return transactions.map((transaction) => ({
    ...transaction,
    rewards: calculateRewards(transaction.amount),
  }));
}

export async function getCustomers() {
  const transactionsWithRewards = await getTransactionsWithRewards();

  return transactionsWithRewards.reduce((acc, transaction) => {
    if (!acc.includes(transaction.customer_id)) {
      acc.push(transaction.customer_id);
    }
    return acc;
  }, []);
}

export async function getTransactionsWithRewardsByMonth(month) {
  const transactionsWithRewards = await getTransactionsWithRewards();

  return transactionsWithRewards.filter(
    (transaction) =>
      new Date(transaction.time).getMonth().toString() === month
  );
}

export async function getTransactionsWithRewardsByCustomer(customer_id) {
  const transactionsWithRewards = await getTransactionsWithRewards();

  return transactionsWithRewards.filter(
    (transaction) => transaction.customer_id === customer_id
  );
}

export async function getTransactionsWithRewardsByCustomerAndMonth(
  customer_id,
  month
) {
  const transactionsWithRewards = await getTransactionsWithRewards();

  return transactionsWithRewards.filter(
    (transaction) =>
      transaction.customer_id === customer_id &&
      new Date(transaction.time).getMonth().toString() === month
  );
}
