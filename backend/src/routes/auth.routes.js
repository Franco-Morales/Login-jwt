import { Router } from "express";

import { signUp, loggIn, refreshAccessToken, logout } from "../controllers/auth.controller";
import { singUpVal, loggInVal } from "../validators/authValidator";


const router = Router();

router.post("/auth/signup", singUpVal, signUp);
router.post("/auth/loggin", loggInVal, loggIn);

router.post("/auth/refresh-token", refreshAccessToken);
router.post("/auth/logout", logout);


export default router;