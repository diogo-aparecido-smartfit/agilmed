import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { ControllerFactory } from "../di/factories/controller.factory";

const patientRouter = Router();
const patientController = ControllerFactory.createPatientController();

/**
 * @openapi
 * /api/patients:
 *   post:
 *     summary: Cria um novo paciente
 *     tags:
 *       - Pacientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 description: Nome completo do paciente
 *               email:
 *                 type: string
 *                 description: E-mail do paciente
 *               password:
 *                 type: string
 *                 description: Senha do paciente
 *               phone:
 *                 type: string
 *                 description: Número de telefone do paciente
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento do paciente
 *               cpf:
 *                 type: string
 *                 description: CPF do paciente
 *               address:
 *                 type: string
 *                 description: Endereço do paciente
 *               city:
 *                 type: string
 *                 description: Cidade do paciente
 *               state:
 *                 type: string
 *                 description: Estado do paciente
 *               gender:
 *                 type: string
 *                 description: Gênero do paciente
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 *       400:
 *         description: Dados inválidos ou faltantes
 */
patientRouter.post(
  "/",
  patientController.createPatient.bind(patientController)
);

/**
 * @openapi
 * /api/patients:
 *   get:
 *     summary: Retorna todos os pacientes
 *     tags:
 *       - Pacientes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pacientes retornada com sucesso
 *       401:
 *         description: Não autorizado, autenticação necessária
 */
patientRouter.get(
  "/",
  authenticateJWT,
  patientController.getAllPatients.bind(patientController)
);

/**
 * @openapi
 * /api/patients/{id}:
 *   get:
 *     summary: Retorna um paciente pelo ID
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Paciente encontrado com sucesso
 *       401:
 *         description: Não autorizado, autenticação necessária
 *       404:
 *         description: Paciente não encontrado
 */
patientRouter.get(
  "/:id",
  authenticateJWT,
  patientController.getPatientById.bind(patientController)
);

/**
 * @openapi
 * /api/patients/{id}:
 *   patch:
 *     summary: Atualiza informações de um paciente
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
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
 *                 description: Nome completo do paciente
 *               phone:
 *                 type: string
 *                 description: Número de telefone do paciente
 *               address:
 *                 type: string
 *                 description: Endereço do paciente
 *               city:
 *                 type: string
 *                 description: Cidade do paciente
 *               state:
 *                 type: string
 *                 description: Estado do paciente
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *       401:
 *         description: Não autorizado, autenticação necessária
 *       404:
 *         description: Paciente não encontrado
 */
patientRouter.patch(
  "/:id",
  authenticateJWT,
  patientController.updatePatient.bind(patientController)
);

/**
 * @openapi
 * /api/patients/{id}:
 *   delete:
 *     summary: Remove um paciente
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Paciente removido com sucesso
 *       401:
 *         description: Não autorizado, autenticação necessária
 *       404:
 *         description: Paciente não encontrado
 */
patientRouter.delete(
  "/:id",
  authenticateJWT,
  patientController.deletePatient.bind(patientController)
);

export default patientRouter;
