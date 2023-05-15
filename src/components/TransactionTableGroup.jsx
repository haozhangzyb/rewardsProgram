import PropTypes from "prop-types";

import TransactionTable from "./TransactionTable";
import { monthsNames } from "../utils/util";
import { sumRewards } from "../utils/transactions";

export default function TransactionTableGroup({ transactions, months }) {
  const transactionsByMonth = months.map((month) => {
    return transactions.filter((transaction) => {
      return new Date(transaction.transaction_time).getMonth() === month;
    });
  });

  return (
    <>
      {transactionsByMonth?.map((transactions, index) => {
        return (
          transactions !== undefined &&
          transactions.length > 0 && (
            <div key={index}>
              <h3 className='month-title'>
                {monthsNames[index + 1]} Rewards Total:{" "}
                {sumRewards(transactions)}
              </h3>
              <TransactionTable transactions={transactions} />
            </div>
          )
        );
      })}
    </>
  );
}

// add this to fix linting error:
TransactionTableGroup.propTypes = {
  transactions: PropTypes.array.isRequired,
  months: PropTypes.array.isRequired,
};
