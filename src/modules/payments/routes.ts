import { Router } from "express";
import { createPaymentIntent } from "./controller";
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

export default router;
