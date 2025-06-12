import { Router } from "express";
import { DoctorController } from "../controllers/doctor.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { cacheMiddleware } from "../middlewares/cache.middleware";

const doctorRouter = Router();
const doctorController = new DoctorController();

/**
 * @openapi
 * /api/doctors:
 *   post:
 *     summary: Cria um novo médico
 *     tags:
 *       - Médicos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 description: Nome completo do médico
 *               email:
 *                 type: string
 *                 description: E-mail do médico
 *               password:
 *                 type: string
 *                 description: Senha do médico
 *               phone:
 *                 type: string
 *                 description: Número de telefone do médico
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento do médico
 *               cpf:
 *                 type: string
 *                 description: CPF do médico
 *               address:
 *                 type: string
 *                 description: Endereço do médico
 *               city:
 *                 type: string
 *                 description: Cidade do médico
 *               state:
 *                 type: string
 *                 description: Estado do médico
 *               gender:
 *                 type: string
 *                 description: Gênero do médico
 *               specialty:
 *                 type: string
 *                 description: Especialidade médica
 *               crm:
 *                 type: string
 *                 description: Número do CRM do médico
 *               bio:
 *                 type: string
 *                 description: Biografia/descrição do médico
 *               available_hours:
 *                 type: string
 *                 description: Horários disponíveis para consulta
 *     responses:
 *       201:
 *         description: Médico criado com sucesso
 *       400:
 *         description: Dados inválidos ou faltantes
 */
doctorRouter.post("/", doctorController.createDoctor.bind(doctorController));

/**
 * @openapi
 * /api/doctors:
 *   get:
 *     summary: Retorna todos os médicos
 *     tags:
 *       - Médicos
 *     parameters:
 *       - in: query
 *         name: specialty
 *         schema:
 *           type: string
 *         description: Filtro por especialidade médica
 *     responses:
 *       200:
 *         description: Lista de médicos retornada com sucesso
 */
doctorRouter.get(
  "/",
  cacheMiddleware({ expire: 3600 }),
  doctorController.getAllDoctors.bind(doctorController)
);

/**
 * @openapi
 * /api/doctors/{id}:
 *   get:
 *     summary: Retorna um médico pelo ID
 *     tags:
 *       - Médicos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do médico
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Médico encontrado com sucesso
 *       404:
 *         description: Médico não encontrado
 */
doctorRouter.get(
  "/:id",
  authenticateJWT,
  cacheMiddleware({ expire: 3600 }),
  doctorController.getDoctorById.bind(doctorController)
);

/**
 * @openapi
 * /api/doctors/{id}:
 *   patch:
 *     summary: Atualiza informações de um médico
 *     tags:
 *       - Médicos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do médico
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               specialty:
 *                 type: string
 *                 description: Especialidade médica
 *               bio:
 *                 type: string
 *                 description: Biografia/descrição do médico
 *               available_hours:
 *                 type: string
 *                 description: Horários disponíveis para consulta
 *     responses:
 *       200:
 *         description: Médico atualizado com sucesso
 *       404:
 *         description: Médico não encontrado
 */
doctorRouter.patch(
  "/:id",
  authenticateJWT,
  doctorController.updateDoctor.bind(doctorController)
);

/**
 * @openapi
 * /api/doctors/{id}:
 *   delete:
 *     summary: Remove um médico
 *     tags:
 *       - Médicos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do médico
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Médico removido com sucesso
 *       404:
 *         description: Médico não encontrado
 */
doctorRouter.delete(
  "/:id",
  authenticateJWT,
  doctorController.deleteDoctor.bind(doctorController)
);

export default doctorRouter;
