import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const authController = new AuthController();

router.post("/login", (req, res) => authController.authenticate(req, res));
router.post("/register", authController.register.bind(authController));
router.post("/verify", authController.verifyCode.bind(authController));
router.post(
  "/reset-password",
  authController.resetPassword.bind(authController)
);

export default router;
