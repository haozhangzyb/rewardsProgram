import mockData from "./mockData";

export function getTransactions() {
  return new Promise((resolve) => {
    // mock api fetching delay
    setTimeout(() => {
      resolve(mockData.transaction);
    }, 500);
  });
}
