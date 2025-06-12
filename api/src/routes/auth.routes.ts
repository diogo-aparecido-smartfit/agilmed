import { Router } from "express";
import { ControllerFactory } from "../controllers/controller.factory";

const router = Router();
const authController = ControllerFactory.createAuthController();

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: E-mail ou CPF do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", authController.authenticate.bind(authController));

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 description: Nome completo do usuário
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento
 *               cpf:
 *                 type: string
 *                 description: CPF do usuário
 *               address:
 *                 type: string
 *                 description: Endereço do usuário
 *               city:
 *                 type: string
 *                 description: Cidade do usuário
 *               state:
 *                 type: string
 *                 description: Estado do usuário
 *               phone:
 *                 type: string
 *                 description: Número de telefone do usuário
 *               gender:
 *                 type: string
 *                 description: Gênero do usuário
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 */
router.post("/register", authController.register.bind(authController));

/**
 * @openapi
 * /api/auth/verify:
 *   post:
 *     summary: Verifica código de autenticação
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Código de verificação enviado ao usuário
 *     responses:
 *       200:
 *         description: Código verificado com sucesso
 */
router.post("/verify", authController.verifyCode.bind(authController));

/**
 * @openapi
 * /api/auth/reset-password:
 *   post:
 *     summary: Redefine a senha do usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário para redefinir a senha
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 */
router.post(
  "/reset-password",
  authController.resetPassword.bind(authController)
);

export default router;
