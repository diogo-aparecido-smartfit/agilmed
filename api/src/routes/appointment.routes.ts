import { Router } from "express";
import { AppointmentController } from "../controllers/appointment.controller";
import { authenticateJWT, isAdmin } from "../middlewares/auth.middleware";

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

/**
 * @openapi
 * /api/appointments:
 *   post:
 *     summary: Cria uma nova consulta
 *     tags:
 *       - Consultas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient_id:
 *                 type: integer
 *                 description: ID do paciente
 *               doctor_id:
 *                 type: integer
 *                 description: ID do médico
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora da consulta
 *               status:
 *                 type: string
 *                 description: Status da consulta (agendada, confirmada, cancelada, etc)
 *               reason:
 *                 type: string
 *                 description: Motivo da consulta
 *     responses:
 *       201:
 *         description: Consulta criada com sucesso
 *       400:
 *         description: Dados inválidos ou faltantes
 */
appointmentRouter.post(
  "/",
  appointmentController.createAppointment.bind(appointmentController)
);

/**
 * @openapi
 * /api/appointments/my:
 *   get:
 *     summary: Retorna as consultas do usuário autenticado
 *     tags:
 *       - Consultas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de consultas retornada com sucesso
 *       401:
 *         description: Não autorizado, autenticação necessária
 */
appointmentRouter.get(
  "/my",
  authenticateJWT,
  appointmentController.getMyAppointments.bind(appointmentController)
);

/**
 * @openapi
 * /api/appointments:
 *   get:
 *     summary: Retorna todas as consultas (apenas para administradores)
 *     tags:
 *       - Consultas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas as consultas retornada com sucesso
 *       401:
 *         description: Não autorizado, autenticação necessária
 *       403:
 *         description: Acesso proibido, permissão de administrador necessária
 */
appointmentRouter.get(
  "/",
  authenticateJWT,
  isAdmin,
  appointmentController.getAllAppointments.bind(appointmentController)
);

/**
 * @openapi
 * /api/appointments/{id}:
 *   get:
 *     summary: Retorna uma consulta pelo ID
 *     tags:
 *       - Consultas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da consulta
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Consulta encontrada com sucesso
 *       401:
 *         description: Não autorizado, autenticação necessária
 *       404:
 *         description: Consulta não encontrada
 */
appointmentRouter.get(
  "/:id",
  authenticateJWT,
  appointmentController.getAppointmentById.bind(appointmentController)
);

/**
 * @openapi
 * /api/appointments/{id}:
 *   patch:
 *     summary: Atualiza informações de uma consulta
 *     tags:
 *       - Consultas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da consulta
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Nova data e hora da consulta
 *               status:
 *                 type: string
 *                 description: Novo status da consulta
 *               reason:
 *                 type: string
 *                 description: Motivo atualizado da consulta
 *     responses:
 *       200:
 *         description: Consulta atualizada com sucesso
 *       401:
 *         description: Não autorizado, autenticação necessária
 *       404:
 *         description: Consulta não encontrada
 */
appointmentRouter.patch(
  "/:id",
  authenticateJWT,
  appointmentController.updateAppointment.bind(appointmentController)
);

/**
 * @openapi
 * /api/appointments/{id}:
 *   delete:
 *     summary: Remove uma consulta
 *     tags:
 *       - Consultas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da consulta
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Consulta removida com sucesso
 *       401:
 *         description: Não autorizado, autenticação necessária
 *       404:
 *         description: Consulta não encontrada
 */
appointmentRouter.delete(
  "/:id",
  authenticateJWT,
  appointmentController.deleteAppointment.bind(appointmentController)
);

export default appointmentRouter;
