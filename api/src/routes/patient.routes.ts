import { Router } from "express";
import { PatientController } from "../controllers/patient.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const patientRouter = Router();
const patientController = new PatientController();

// Rotas públicas
patientRouter.post(
  "/",
  patientController.createPatient.bind(patientController)
);

// Rotas protegidas
patientRouter.get(
  "/",
  authenticateJWT,
  patientController.getAllPatients.bind(patientController)
);
patientRouter.get(
  "/:id",
  authenticateJWT,
  patientController.getPatientById.bind(patientController)
);
patientRouter.patch(
  "/:id",
  authenticateJWT,
  patientController.updatePatient.bind(patientController)
);
patientRouter.delete(
  "/:id",
  authenticateJWT,
  patientController.deletePatient.bind(patientController)
);

export default patientRouter;
