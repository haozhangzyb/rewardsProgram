import { useState } from "react";
import "./App.css";
import DropdownMenu from "./components/DropdownMenu";
import useTransactions from "./hooks/useTransactions";
import { getFilteredTransactions } from "./utils/transactions";
import TransactionTable from "./components/TransactionTable";
import TransactionTableGroup from "./components/TransactionTableGroup";
import { monthsNames } from "./utils/util";

function App() {
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState("all");

  const { isLoading, transactions, customers, months } = useTransactions();

  const customerMenuOptions = [
    { name: "All customers", value: "all" },
    ...customers.map((customer) => ({
      name: customer,
      value: customer,
    })),
  ];

  const monthMenuOptions = [
    { name: "All months", value: "all" },
    ...months.map((month) => ({
      name: monthsNames[month],
      value: month,
    })),
  ];

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const filteredTransactions = getFilteredTransactions(
    selectedCustomer,
    selectedMonth,
    transactions
  );

  function handleResetFilters() {
    setSelectedMonth("all");
    setSelectedCustomer("all");
  }

  const totalRewards = filteredTransactions.reduce((acc, transaction) => {
    return acc + transaction.rewards;
  }, 0);

  return (
    <>
      <h1 className='title'>Rewards Program</h1>
      <div className='container'>
        <div className='filter-area'>
          <DropdownMenu
            name='customer'
            options={customerMenuOptions}
            selectedOption={selectedCustomer}
            setSelectedOption={setSelectedCustomer}
          />

          <DropdownMenu
            name='month'
            options={monthMenuOptions}
            selectedOption={selectedMonth}
            setSelectedOption={setSelectedMonth}
          />
        </div>

        <button onClick={handleResetFilters}>
          Get All Transactions with Rewards
        </button>
      </div>

      <h2 className='rewards-total'>Total Rewards: {totalRewards}</h2>

      <div className='table-container'>
        {selectedMonth === "all" ? (
          <TransactionTableGroup
            transactions={filteredTransactions}
            months={months}
          />
        ) : (
          <TransactionTable transactions={filteredTransactions} />
        )}
      </div>
    </>
  );
}

export default App;
