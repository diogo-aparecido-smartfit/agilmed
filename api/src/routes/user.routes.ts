import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { ControllerFactory } from "../controllers/controller.factory";

const userRouter = Router();
const userController = ControllerFactory.createUserController();

/**
 * @openapi
 * /api/user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Usuários
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
 *               role:
 *                 type: string
 *                 description: Função do usuário (admin, user, etc)
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou faltantes
 */
userRouter.post("/", userController.createUser.bind(userController));

/**
 * @openapi
 * /api/user:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       401:
 *         description: Não autorizado, autenticação necessária
 */
userRouter.get(
  "/",
  authenticateJWT,
  userController.getAllUsers.bind(userController)
);

/**
 * @openapi
 * /api/user/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *       401:
 *         description: Não autorizado, autenticação necessária
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.get(
  "/:id",
  authenticateJWT,
  userController.getUserById.bind(userController)
);

/**
 * @openapi
 * /api/user/{id}:
 *   patch:
 *     summary: Atualiza informações de um usuário
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     security:
 *       - bearerAuth: []
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
 *               role:
 *                 type: string
 *                 description: Função do usuário
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       401:
 *         description: Não autorizado, autenticação necessária
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.patch(
  "/:id",
  authenticateJWT,
  userController.updateUser.bind(userController)
);

/**
 * @openapi
 * /api/user/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       401:
 *         description: Não autorizado, autenticação necessária
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.delete(
  "/:id",
  authenticateJWT,
  userController.deleteUser.bind(userController)
);

export default userRouter;
