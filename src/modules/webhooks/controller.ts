import Stripe from "stripe";
import stripe, { getEvent } from "../../core/stripe";

enum StripeEventTypes {
  PaymentIntentsSucceeded = "payment_intent.succeeded",

  InvoicePaymentSucceeded = "invoice.payment_succeeded",

  CustomerSubscriptionCreated = "customer.subscription.created",
  CustomerSubscriptionUpdated = "customer.subscription.updated",
  CustomerSubscriptionDeleted = "customer.subscription.deleted",
}

interface StripeInvoiceDataObject extends Stripe.Event.Data.Object {
  subscription: string;
  payment_intent: string;
  billing_reason: string;
}

async function processWebhook(body: Buffer, signature: string) {
  const event = getEvent(body, signature);
  const { type, data } = event;

  switch (type) {
    case StripeEventTypes.InvoicePaymentSucceeded: {
      // Every payment confirmation
      const dataObject = data.object as StripeInvoiceDataObject;
      const subscriptionId = dataObject["subscription"];
      const paymentIntentId = dataObject["payment_intent"];

      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      const paymentMethod = paymentIntent.payment_method as string;

      const subscription = await stripe.subscriptions.update(subscriptionId, {
        default_payment_method: paymentMethod,
      });

      console.log(
        "Default payment method set for subscription:" +
          paymentIntent.payment_method
      );
      break;
    }

    case StripeEventTypes.CustomerSubscriptionCreated: {
      // Setup the subscriptionId in the customer
      const dataObject = data.object as Stripe.Subscription;
      console.info("[Info] Webhooks: Subscription created");
      console.info("Subscription status", dataObject.status);
      break;
    }
    case StripeEventTypes.CustomerSubscriptionUpdated: {
      // Verify and activate the premium account (check status)
      const dataObject = data.object as Stripe.Subscription;
      console.info("[Info] Webhooks: Subscription updated");
      console.info("Subscription status", dataObject.status);
      break;
    }
    case StripeEventTypes.CustomerSubscriptionDeleted: {
      // Remove the subscriptionId (check status)
      const dataObject = data.object as Stripe.Subscription;
      console.info("[Info] Webhooks: Subscription deleted");
      console.info("Subscription status", dataObject.status);
      break;
    }
    default:
      console.warn("[Warn] Webhook: Not handled", type);
      break;
  }
}

export { processWebhook };
