import { useEffect, useState } from "react";
import { getTransactions } from "../api/api";
import { mapTransactionsWithRewards } from "../utils/transactions";

export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTransactions()
      .then((res) => setTransactions(mapTransactionsWithRewards(res)))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const customers = transactions.reduce((acc, transaction) => {
    if (!acc.includes(transaction.customer_id)) {
      acc.push(transaction.customer_id);
    }
    return acc;
  }, []);

  const months = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.transaction_time).getMonth();
    if (!acc.includes(month)) {
      acc.push(month);
    }
    return acc;
  }, []);

  return {
    isLoading,
    transactions,
    customers,
    months,
  };
}
