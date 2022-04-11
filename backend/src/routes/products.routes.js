import { Router } from "express";

import { getAllProducts, getOneById } from "../controllers/products.controller";
import { isAuth } from "../middlewares/isAuth";

const router = Router();


router.get("/products", isAuth, getAllProducts);
router.get("/products/:id", isAuth, getOneById);


export default router;