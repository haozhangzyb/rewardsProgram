import { calculateRewards } from "./transactions";

import { mapTransactionsWithRewards } from "./transactions";
import { fakeTransactions } from "../App.test";

describe("transaction", () => {
  it("should calculate correct rewards", () => {
    expect(calculateRewards(0)).toBe(0);
    expect(calculateRewards(50)).toBe(0);
    expect(calculateRewards(100)).toBe(50);
    expect(calculateRewards(101)).toBe(52);
    expect(calculateRewards(200)).toBe(250);
  });

  it("should map transactions with rewards", () => {
    const expectedTransactions = [
      {
        id: "1",
        customer_id: "1",
        amount: 120,
        transaction_time: 1609631826000,
        rewards: 90,
      },
      {
        id: "2",
        customer_id: "1",
        amount: 130,
        transaction_time: 1612310226000,
        rewards: 110,
      },
      {
        id: "3",
        customer_id: "2",
        amount: 140,
        transaction_time: 1614729426000,
        rewards: 130,
      },
      {
        id: "4",
        customer_id: "3",
        amount: 150,
        transaction_time: 1617407826000,
        rewards: 150,
      },
      {
        id: "5",
        customer_id: "3",
        amount: 160,
        transaction_time: 1619999826000,
        rewards: 170,
      },
    ];
    expect(mapTransactionsWithRewards(fakeTransactions)).toEqual(
      expectedTransactions
    );
  });
});
