import { Router } from "express";
import { processPayment } from "./controller";

const router = Router();

router.post("/payments", async (request, response) => {
  const { amount, id } = request.body;
  const payment = await processPayment(id, amount);
  response.json({
    success: payment,
  });
});

export default router;
