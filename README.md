# (Proof of concept) Node.js Stripe integration

## To run the project

### Install dependencies
`npm install`

### Set up environment variables

#### Stripe secret API key
- Copy and paste the `.env.example` file and rename it like `.env`
- Go to the developer section of the Stripe account and copy the secret api key
- Replace the comment next to `STRIPE_SECRET_KEY=` with the key

#### (Optional) Replace the port

- In case the default port (1337) is causing conflicts replace the port in the `.env` file with a new one.

> Don't forget to replace the port on the UI application