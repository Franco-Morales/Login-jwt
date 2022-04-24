import { Router } from "express";

import { getAllProducts, getOneById } from "../controllers/products.controller";
import { isAuth } from "../middlewares/isAuth";


const router = Router();

router.use("/products", isAuth);

router.get("/products", getAllProducts);
router.get("/products/:id", getOneById);


export default router;