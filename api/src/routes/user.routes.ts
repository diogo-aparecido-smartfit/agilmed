import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post("/", userController.createUser.bind(userController));

/**
 * @openapi
 * /api/user:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
userRouter.get("/", userController.getAllUsers.bind(userController));

/**
 * @openapi
 * /api/user/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.get("/:id", userController.getUserById.bind(userController));

/**
 * @openapi
 * /api/user/{id}:
 *   patch:
 *     summary: Atualiza um usuário
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.patch("/:id", userController.updateUser.bind(userController));

/**
 * @openapi
 * /api/user/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.delete("/:id", userController.deleteUser.bind(userController));

export default userRouter;
