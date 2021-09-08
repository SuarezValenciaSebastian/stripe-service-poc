import { Router } from "express";
import { processWebhook } from "./controller";

const router = Router();

router.post("/webhooks", async (request, response) => {
  const event = request.raw;
  const signature = request.headers["stripe-signature"] as string;
  processWebhook(event, signature);
  response.sendStatus(200);
});

export default router;
