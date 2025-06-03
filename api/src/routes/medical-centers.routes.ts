import { Router } from "express";
import { MedicalCentersController } from "../controllers/medical-centers.controller";

const medicalCentersRouter = Router();
const placesController = new MedicalCentersController();

medicalCentersRouter.get(
  "/",
  placesController.getNearbyPlaces.bind(placesController)
);

export default medicalCentersRouter;
