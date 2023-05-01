import { useState } from "react";
import "./App.css";
import DropdownMenu from "./components/DropdownMenu";
import useTransactions from "./hooks/useTransactions";

function App() {
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState("all");

  const {
    data,
    fetchTransactionsWithRewards,
    fetchTransactions,
    isShowRewards,
    totalRewards,
    customers,
  } = useTransactions();

  function handleGetAllTransaction() {
    setSelectedMonth("all");
    setSelectedCustomer("all");
    fetchTransactions();
  }

  const customerMenuOptions = [
    { name: "All customers", value: "all" },
    ...customers.map((customer) => ({
      name: customer,
      value: customer,
    })),
  ];

  const monthMenuOptions = [
    { name: "All months", value: "all" },
    { name: "Feb", value: "1" },
    { name: "Mar", value: "2" },
    { name: "Apr", value: "3" },
  ];

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

          <button
            onClick={() =>
              fetchTransactionsWithRewards(selectedCustomer, selectedMonth)
            }
          >
            Get Filtered Rewards
          </button>
        </div>

        <button onClick={handleGetAllTransaction}>
          Get All Transactions
        </button>
      </div>

      {isShowRewards && (
        <h2 className='rewards-total'>Total Rewards: {totalRewards}</h2>
      )}

      <table className='transaction-table'>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Customer ID</th>
            <th>Amount</th>
            <th>Time</th>
            {isShowRewards && <th>Rewards</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.customer_id}</td>
              <td>{transaction.amount}</td>
              <td>
                {new Date(transaction.time).toISOString().split("T")[0]}
              </td>
              {isShowRewards && <td>{transaction.rewards}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
