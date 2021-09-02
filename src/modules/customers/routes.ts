import { Router } from "express";
import { createCustomer } from "./controller";

const router = Router();

router.post("/customers", async (request, response) => {
  const customer = request.body;
  const stripeCustomer = await createCustomer(customer);
  response.json({ stripeCustomer });
});

export default router;
