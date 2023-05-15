import { act, renderHook, waitFor } from "@testing-library/react";

import { fakeTransactions } from "../App.test";
import useTransactions from "./useTransactions";
import { getTransactions } from "../api/api";

jest.mock("../api/api");

describe("useTransactions", () => {
  getTransactions.mockResolvedValue(
    new Promise((resolve) =>
      setTimeout(() => {
        resolve(fakeTransactions);
      }, 500)
    )
  );

  it("should get correct months", async () => {
    const { result } = await act(async () =>
      renderHook(() => useTransactions())
    );

    await waitFor(() => {
      expect(result.current.months).toEqual([0, 1, 2, 3, 4]);
    });
  });
});
