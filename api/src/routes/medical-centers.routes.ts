import { Router } from "express";
import { MedicalCentersController } from "../controllers/medical-centers.controller";
import { cacheMiddleware } from "../middlewares/cache.middleware";

const medicalCentersRouter = Router();
const placesController = new MedicalCentersController();

medicalCentersRouter.get(
  "/",
  cacheMiddleware({
    expire: 3600 * 24,
    customKey: (req) =>
      `cache:medical-centers:${req.query.lat}:${req.query.lon}:${req.query.query}`,
  }),
  placesController.getNearbyPlaces.bind(placesController)
);

export default medicalCentersRouter;
