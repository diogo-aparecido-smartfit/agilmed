import { Router } from "express";
import { AppointmentController } from "../controllers/appointment.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

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
  appointmentController.getAllAppointments.bind(appointmentController)
);
appointmentRouter.get(
  "/:id",
  appointmentController.getAppointmentById.bind(appointmentController)
);
appointmentRouter.patch(
  "/:id",
  appointmentController.updateAppointment.bind(appointmentController)
);
appointmentRouter.delete(
  "/:id",
  appointmentController.deleteAppointment.bind(appointmentController)
);

export default appointmentRouter;
