import { formatTransactionTime } from "../utils/util";

export default function TransactionTable({ transactions }) {
  return (
    <table className='transaction-table'>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Customer ID</th>
          <th>Amount</th>
          <th>Transaction Time</th>
          <th>Rewards</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.customer_id}</td>
            <td>{transaction.amount}</td>
            <td>{formatTransactionTime(transaction.transaction_time)}</td>
            <td>{transaction.rewards}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
