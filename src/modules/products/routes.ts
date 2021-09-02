import { Router } from "express";
import { getProducts } from "./controller";

const router = Router();

router.get("/products", (_request, response) => {
  const products = getProducts();
  response.json(products);
});

export default router;
