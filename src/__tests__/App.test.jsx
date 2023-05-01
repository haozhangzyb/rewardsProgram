import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "../App";

it("customer and month dropdown menu should render and select 'all' as the default", async () => {
  await act(async () => render(<App />));
  const customerSelect = screen.getByRole("combobox", {
    name: /by customer/i,
  });
  const monthSelect = screen.getByRole("combobox", { name: /by month/i });
  expect(customerSelect).toHaveValue("all");
  expect(monthSelect).toHaveValue("all");
});

it("should calculate the correct rewards", async () => {
  await act(async () => render(<App />));
  const rewardsButton = screen.getByRole("button", {
    name: /Get Filtered Rewards/i,
  });
  expect(() => screen.getByText("Total Rewards:")).toThrow();
  await act(async () => rewardsButton.click());
  const rewards = screen.getByText("Total Rewards: 35523");
  expect(rewards).toBeInTheDocument();
});

it("should render the table with the correct headers", async () => {
  await act(async () => render(<App />));
  const headers = screen.getAllByRole("columnheader");
  expect(headers).toHaveLength(4);
  expect(headers[0]).toHaveTextContent("Transaction ID");
  expect(headers[1]).toHaveTextContent("Customer ID");
  expect(headers[2]).toHaveTextContent("Amount");
  expect(headers[3]).toHaveTextContent("Time");
});

it("should render the table with the correct data when only filtered by month", async () => {
  await act(async () => render(<App />));
  const monthSelect = screen.getByRole("combobox", {
    name: /by month/i,
  });
  const rewardsButton = screen.getByRole("button", {
    name: /Get Filtered Rewards/i,
  });
  await act(async () => userEvent.selectOptions(monthSelect, "1"));
  await act(async () => rewardsButton.click());
  const rows = screen.getAllByRole("row");
  expect(rows).toHaveLength(36);
});

it("should render the table with the correct data when only filtered by customer", async () => {
  await act(async () => render(<App />));
  const customerSelect = screen.getByRole("combobox", {
    name: /by customer/i,
  });
  const rewardsButton = screen.getByRole("button", {
    name: /Get Filtered Rewards/i,
  });
  await act(async () =>
    userEvent.selectOptions(
      customerSelect,
      "2a54c963-a94a-4ca3-b97c-5b91a1010cc2"
    )
  );
  await act(async () => rewardsButton.click());
  const rows = screen.getAllByRole("row");
  expect(rows).toHaveLength(27);
});

it("should render the table with the correct data when filtered by customer and month", async () => {
  await act(async () => render(<App />));

  const monthSelect = screen.getByRole("combobox", {
    name: /by month/i,
  });

  const customerSelect = screen.getByRole("combobox", {
    name: /by customer/i,
  });

  const rewardsButton = screen.getByRole("button", {
    name: /Get Filtered Rewards/i,
  });
  await act(async () => {
    userEvent.selectOptions(
      customerSelect,
      "2a54c963-a94a-4ca3-b97c-5b91a1010cc2"
    );
    userEvent.selectOptions(monthSelect, "1");
  });
  await act(async () => rewardsButton.click());
  const rows = screen.getAllByRole("row");
  expect(rows).toHaveLength(7);
});

it("should render the table with the correct data when filtered by customer and month and then reset", async () => {
  await act(async () => render(<App />));

  const monthSelect = screen.getByRole("combobox", {
    name: /by month/i,
  });

  const customerSelect = screen.getByRole("combobox", {
    name: /by customer/i,
  });

  const rewardsButton = screen.getByRole("button", {
    name: /Get Filtered Rewards/i,
  });

  const allTransactionsButton = screen.getByRole("button", {
    name: /get all transactions/i,
  });

  await act(async () => {
    userEvent.selectOptions(
      customerSelect,
      "2a54c963-a94a-4ca3-b97c-5b91a1010cc2"
    );
    userEvent.selectOptions(monthSelect, "1");
  });
  await act(async () => rewardsButton.click());
  const rows = screen.getAllByRole("row");
  expect(rows).toHaveLength(7);

  await act(async () => allTransactionsButton.click());
  const allRows = screen.getAllByRole("row");
  expect(allRows).toHaveLength(101);
});
