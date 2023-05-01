import { useEffect, useState } from "react";
import {
  getTransactions,
  getCustomers,
  getTransactionsWithRewardsByCustomer,
  getTransactionsWithRewardsByCustomerAndMonth,
  getTransactionsWithRewards,
  getTransactionsWithRewardsByMonth,
} from "../api/api";

export default function useTransactions() {
  const [data, setData] = useState([]);
  const [isShowRewards, setIsShowRewards] = useState(false);
  const [customers, setCustomers] = useState([]);

  let totalRewards = 0;
  if (isShowRewards) {
    totalRewards = data.reduce((acc, transaction) => {
      return acc + transaction.rewards;
    }, 0);
  }

  useEffect(() => {
    getCustomers().then(setCustomers);
    fetchTransactions();
  }, []);

  async function fetchTransactionsWithRewards(
    selectedCustomer,
    selectedMonth
  ) {
    let transactions = [];
    if (selectedCustomer === "all" && selectedMonth === "all") {
      transactions = await getTransactionsWithRewards();
    } else if (selectedCustomer === "all" && selectedMonth !== "all") {
      transactions = await getTransactionsWithRewardsByMonth(
        selectedMonth
      );
    } else if (selectedCustomer !== "all" && selectedMonth === "all") {
      transactions = await getTransactionsWithRewardsByCustomer(
        selectedCustomer
      );
    } else {
      transactions = await getTransactionsWithRewardsByCustomerAndMonth(
        selectedCustomer,
        selectedMonth
      );
    }
    setData(transactions);
    setIsShowRewards(true);
  }

  async function fetchTransactions() {
    const res = await getTransactions();
    setData(res);
    setIsShowRewards(false);
  }

  return {
    data,
    fetchTransactionsWithRewards,
    fetchTransactions,
    isShowRewards,
    totalRewards,
    customers,
  };
}
