export const monthsNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatTransactionTime = (transactionTime) => {
  return new Date(transactionTime).toISOString().split("T")[0];
};
