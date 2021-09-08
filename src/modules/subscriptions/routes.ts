import { Router } from "express";
import { getProduct } from "../products/controller";
import { createPaymentIntent, deleteSubscription } from "./controller";

const router = Router();

router.post("/subscription-intents", async (request, response) => {
  const { customerId, productId } = request.body; // Retrieve the customerId from the DB
  const product = getProduct(productId);

  if (!product || product.stripe.priceId === "") {
    return response.sendStatus(404);
  }

  const paymentIntent = await createPaymentIntent(
    customerId,
    product.stripe.priceId
  );

  response.json(paymentIntent);
});

router.delete("/subscriptions", async (request, response) => {
  const { subscriptionId } = request.body;

  const subscription = await deleteSubscription(subscriptionId);

  response.json(subscription);
});

export default router;
