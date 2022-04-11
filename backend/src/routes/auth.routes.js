import { Router } from "express";

import { signUp, loggIn } from "../controllers/auth.controller";
import { singUpVal, loggInVal } from "../validators/authValidator";

const router = Router();


router.post("/auth/signup", singUpVal, signUp);
router.post("/auth/loggin", loggInVal, loggIn);


export default router;