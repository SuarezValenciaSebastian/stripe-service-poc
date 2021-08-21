import { Router } from "express";
import PaymentModule from "./payments";

const router = Router();

router.use("/api", [PaymentModule]);

export default router;
