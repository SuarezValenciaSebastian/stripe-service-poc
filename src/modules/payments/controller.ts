import Stripe from "stripe";
import stripe, { getEvent } from "../../core/stripe";
import { getPriceInCents } from "../../utils/amount";

enum StripeEventTypes {
  PaymentIntentsSucceeded = "payment_intent.succeeded",
}

interface InvoiceExpanded extends Stripe.Invoice {
  payment_intent: Stripe.PaymentIntent;
}

interface SubscriptionExpanded extends Stripe.Subscription {
  latest_invoice: InvoiceExpanded;
}

async function createPaymentIntent(amount: number) {
  return stripe.paymentIntents.create({
    amount: getPriceInCents(amount),
    currency: "USD",
  });
}

async function createSubscription(customerId: string, priceId: string) {
  const subscription = (await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: priceId,
      },
    ],
    payment_behavior: "default_incomplete", // ! This is added to process the payment later
    expand: ["latest_invoice.payment_intent"],
  })) as SubscriptionExpanded;

  return {
    subscriptionId: subscription.id,
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
  };
}

function processWebhook(body: Buffer, signature: string) {
  const { type } = getEvent(body, signature);
  switch (type) {
    case StripeEventTypes.PaymentIntentsSucceeded:
      console.info("[Info] PaymentsController: PaymentSucceeded");
      break;
    default:
      console.warn(
        `[Warn] PaymentsController: Unhandled event triggered by stripe ${type}`
      );
  }
}

export { createPaymentIntent, createSubscription, processWebhook };
