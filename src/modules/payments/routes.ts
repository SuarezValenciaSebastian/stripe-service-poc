import express, { Router } from "express";
import {
  createPaymentIntent,
  createSubscription,
  processWebhook,
} from "./controller";
import { productIdValidationSchema } from "./validations";
import { validator } from "../../utils/validation";
import { getProduct } from "../products/controller";

const router = Router();

router.post(
  "/payment-intents",
  validator(productIdValidationSchema),
  async (request, response) => {
    const { productId } = request.body;
    const product = getProduct(productId);
    if (!product) {
      return response.sendStatus(404);
    }
    const paymentIntent = await createPaymentIntent(product.price);
    response.json({ clientSecret: paymentIntent.client_secret });
  }
);

router.post("/subscription-intents", async (request, response) => {
  const { customerId, productId } = request.body;
  const product = getProduct(productId);
  if (!product) {
    return response.sendStatus(404);
  }
  const subscriptionIntent = await createSubscription(
    customerId,
    product.stripe.priceId
  );
  response.json(subscriptionIntent);
});

router.post("/webhook", async (request, response) => {
  const event = request.raw;
  const signature = request.headers["stripe-signature"] as string; // Validate signature not undefined
  processWebhook(event, signature);
  response.sendStatus(200);
});

export default router;
