import { getTransactions } from "../api/api";
import mockData from "../api/mockData.json";

describe("test getTransactions", function () {
  it("test getTransactions", async () => {
    const transactions = await getTransactions();
    expect(Array.isArray(transactions)).toBe(true);
    expect(transactions.length).toBe(mockData.transaction.length);
    expect(transactions).toEqual(mockData.transaction);
  });
});
