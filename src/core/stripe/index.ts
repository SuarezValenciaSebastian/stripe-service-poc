import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
  throw Error("Stripe secret key was not provided");
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

function getEvent(body: Buffer, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw Error("Webhook secret is not defined");
  }

  return stripe.webhooks.constructEvent(body, signature, webhookSecret);
}

export default stripe;
export { getEvent };
