import stripe from "../../core/stripe";
import { getPriceInCents } from "../../utils/amount";

async function createPaymentIntent(amount: number) {
  return stripe.paymentIntents.create({
    amount: getPriceInCents(amount),
    currency: "USD",
  });
}

export { createPaymentIntent };
