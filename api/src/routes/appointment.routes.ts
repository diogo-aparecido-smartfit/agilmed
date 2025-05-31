import { Router } from "express";
import { AppointmentController } from "../controllers/appointment.controller";
import { authenticateJWT, isAdmin } from "../middlewares/auth.middleware";

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

appointmentRouter.post(
  "/",
  appointmentController.createAppointment.bind(appointmentController)
);

appointmentRouter.get(
  "/my",
  authenticateJWT,
  appointmentController.getMyAppointments.bind(appointmentController)
);

appointmentRouter.get(
  "/",
  authenticateJWT,
  isAdmin,
  appointmentController.getAllAppointments.bind(appointmentController)
);

appointmentRouter.get(
  "/:id",
  authenticateJWT,
  appointmentController.getAppointmentById.bind(appointmentController)
);

appointmentRouter.patch(
  "/:id",
  authenticateJWT,
  appointmentController.updateAppointment.bind(appointmentController)
);

appointmentRouter.delete(
  "/:id",
  authenticateJWT,
  appointmentController.deleteAppointment.bind(appointmentController)
);

export default appointmentRouter;
