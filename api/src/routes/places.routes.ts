import { Router } from "express";
import { PlacesController } from "../controllers/places.controller";

const placesRouter = Router();
const placesController = new PlacesController();

placesRouter.get(
  "/nearby",
  placesController.getNearbyPlaces.bind(placesController)
);

export default placesRouter;
