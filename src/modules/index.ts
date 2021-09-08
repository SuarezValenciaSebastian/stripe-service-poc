import { Router } from "express";
import PaymentModule from "./payments";
import SubscriptionsModule from "./subscriptions";
import WebhooksModule from "./webhooks";
import ProductsModule from "./products";
import CustomersModule from "./customers";

const router = Router();

router.use("/api", [
  PaymentModule,
  SubscriptionsModule,
  ProductsModule,
  CustomersModule,
  WebhooksModule,
]);

export default router;
