import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/create-user", AuthController.createUser);
router.post("/login-user", AuthController.loginUser);

export const authRoutes = router;
