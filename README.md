# ADP Ventures Interview Assessment

This project gets Tasks from the ADP assessment API, calculates the result, and then submits the task result to the same API.

The `index.js` will get and submit tasks continuously, giving the feedback for each submission in the terminal.

In order to avoid rate limiting issues, one task will be fetched and submitted every **5 seconds** by default. This interval can be changed by setting he constant `THROTTLING_DELAY` in the `index.js` file (moving it to a `.env` file would be a possible good refactor).

## How to run the application

1. Install dependencies:
```bash
npm install
```

2. Start the application:
```bash
npm start
```

## Running tests

The tests were written using the Node.js Test Runner. They are ran using the following command:

```bash
npm test
```

## Linting

The app uses ESLint. To `lint` the project or apply automatic `lint` fixes, use the commands:

- Run `lint` script:
```bash
npm run lint
```

- Apply automatic `lint` fixes:
```bash
npm run format
```
