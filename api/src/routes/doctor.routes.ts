import { Router } from "express";
import { DoctorController } from "../controllers/doctor.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { cacheMiddleware } from "../middlewares/cache.middleware";

const doctorRouter = Router();
const doctorController = new DoctorController();

doctorRouter.post("/", doctorController.createDoctor.bind(doctorController));
doctorRouter.get(
  "/",
  cacheMiddleware({ expire: 3600 }),
  doctorController.getAllDoctors.bind(doctorController)
);

doctorRouter.get(
  "/:id",
  authenticateJWT,
  cacheMiddleware({ expire: 3600 }),
  doctorController.getDoctorById.bind(doctorController)
);
doctorRouter.patch(
  "/:id",
  authenticateJWT,
  doctorController.updateDoctor.bind(doctorController)
);
doctorRouter.delete(
  "/:id",
  authenticateJWT,
  doctorController.deleteDoctor.bind(doctorController)
);

export default doctorRouter;
