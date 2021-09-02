import { Router } from "express";
import PaymentModule from "./payments";
import ProductsModule from "./products";
import CustomersModule from "./customers";

const router = Router();

router.use("/api", [PaymentModule, ProductsModule, CustomersModule]);

export default router;
