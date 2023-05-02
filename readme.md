## Start the app

run following command

```
npm install
npm run dev
```

## Check test Coverage

run `npm run test -- --coverage`

```

----------------------------|---------|----------|---------|---------|-------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------------|---------|----------|---------|---------|-------------------
All files                   |     100 |    95.23 |     100 |     100 |
 src                        |     100 |      100 |     100 |     100 |
  App.jsx                   |     100 |      100 |     100 |     100 |
 src/api                    |     100 |      100 |     100 |     100 |
  api.js                    |     100 |      100 |     100 |     100 |
 src/components             |     100 |      100 |     100 |     100 |
  DropdownMenu.jsx          |     100 |      100 |     100 |     100 |
  TransactionTable.jsx      |     100 |      100 |     100 |     100 |
  TransactionTableGroup.jsx |     100 |      100 |     100 |     100 |
 src/hooks                  |     100 |       75 |     100 |     100 |
  useTransactions.jsx       |     100 |       75 |     100 |     100 | 26
 src/utils                  |     100 |      100 |     100 |     100 |
  transactions.js           |     100 |      100 |     100 |     100 |
  util.js                   |     100 |      100 |     100 |     100 |
----------------------------|---------|----------|---------|---------|-------------------

Test Suites: 4 passed, 4 total
Tests:       28 passed, 28 total
Snapshots:   0 total
Time:        2.008 s

```
