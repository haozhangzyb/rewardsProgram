import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "../App";

// TODO: mock api calls
// TODO: split testing files
// TODO: test mock customizde hooks

describe("App", () => {
  it("should displays loading text", async () => {
    await act(async () => render(<App />));
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });

  it("customer and month dropdown menu should render and select 'all' as the default", async () => {
    await act(async () => render(<App />));

    const customerSelect = await screen.findByRole("combobox", {
      name: /by customer/i,
    });
    const monthSelect = await screen.findByRole("combobox", {
      name: /by month/i,
    });
    expect(customerSelect).toHaveValue("all");
    expect(monthSelect).toHaveValue("all");
  });

  it("should calculate the correct rewards", async () => {
    await act(async () => render(<App />));

    const getAllButton = await screen.findByRole("button", {
      name: /get all transactions with rewards/i,
    });
    await act(async () => getAllButton.click());
    const rewards = screen.getByText("Total Rewards: 35523");
    expect(rewards).toBeInTheDocument();
  });

  it("should render the table with the correct headers", async () => {
    await act(async () => render(<App />));

    const tables = await screen.findAllByRole("table");
    const headers = tables[0].querySelectorAll("th");
    expect(headers).toHaveLength(5);
    expect(headers[0]).toHaveTextContent("Transaction ID");
    expect(headers[1]).toHaveTextContent("Customer ID");
    expect(headers[2]).toHaveTextContent("Amount");
    expect(headers[3]).toHaveTextContent("Transaction Time");
    expect(headers[4]).toHaveTextContent("Rewards");
  });

  it("should render the table with the correct data when only filtered by month", async () => {
    await act(async () => render(<App />));

    const monthSelect = await screen.findByRole("combobox", {
      name: /by month/i,
    });
    const customerSelect = await screen.findByRole("combobox", {
      name: /by customer/i,
    });
    const rewardsButton = await screen.findByRole("button", {
      name: /Get filtered Rewards/i,
    });

    await act(async () => userEvent.selectOptions(monthSelect, "1"));
    await act(async () => userEvent.selectOptions(customerSelect, "all"));
    await act(async () => rewardsButton.click());
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(36);
  });

  it("should render the table with the correct data when only filtered by customer", async () => {
    await act(async () => render(<App />));

    const monthSelect = await screen.findByRole("combobox", {
      name: /by month/i,
    });
    const customerSelect = await screen.findByRole("combobox", {
      name: /by customer/i,
    });
    const rewardsButton = await screen.findByRole("button", {
      name: /Get filtered Rewards/i,
    });

    await act(async () => userEvent.selectOptions(monthSelect, "all"));

    await act(async () =>
      userEvent.selectOptions(
        customerSelect,
        "2a54c963-a94a-4ca3-b97c-5b91a1010cc2"
      )
    );
    await act(async () => rewardsButton.click());
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(29);
  });

  it("should render the table with the correct data when filtered by customer and month", async () => {
    await act(async () => render(<App />));

    const monthSelect = await screen.findByRole("combobox", {
      name: /by month/i,
    });
    const customerSelect = await screen.findByRole("combobox", {
      name: /by customer/i,
    });
    const rewardsButton = await screen.findByRole("button", {
      name: /Get filtered Rewards/i,
    });

    await act(async () => userEvent.selectOptions(monthSelect, "1"));

    await act(async () =>
      userEvent.selectOptions(
        customerSelect,
        "2a54c963-a94a-4ca3-b97c-5b91a1010cc2"
      )
    );
    await act(async () => rewardsButton.click());
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(7);
  });

  it("should render the table with the correct data when filtered by customer and month and then reset", async () => {
    await act(async () => render(<App />));

    const monthSelect = await screen.findByRole("combobox", {
      name: /by month/i,
    });
    const customerSelect = await screen.findByRole("combobox", {
      name: /by customer/i,
    });

    const rewardsButton = await screen.findByRole("button", {
      name: /Get Filtered Rewards/i,
    });

    const allTransactionsButton = await screen.findByRole("button", {
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
    expect(allRows).toHaveLength(103);
  });
});
