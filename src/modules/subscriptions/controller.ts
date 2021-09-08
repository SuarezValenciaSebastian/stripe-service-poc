import Stripe from "stripe";
import stripe from "../../core/stripe";

interface InvoiceExpanded extends Stripe.Invoice {
  payment_intent: Stripe.PaymentIntent;
}

interface SubscriptionExpanded extends Stripe.Subscription {
  latest_invoice: InvoiceExpanded;
}

async function createPaymentIntent(customerId: string, priceId: string) {
  const subscription = (await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: priceId,
      },
    ],
    payment_behavior: "default_incomplete",
    expand: ["latest_invoice.payment_intent"],
  })) as SubscriptionExpanded;

  return {
    subscriptionId: subscription.id,
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
  };
}

function deleteSubscription(subscriptionId: string) {
  return stripe.subscriptions.del(subscriptionId);
}

export { createPaymentIntent, deleteSubscription };
