import { Request, Response } from "express";
import { PlacesService } from "../services/places.service";

export class PlacesController {
  private placesService: PlacesService;

  constructor() {
    this.placesService = new PlacesService();
  }

  async getNearbyPlaces(req: Request, res: Response) {
    try {
      const { lat, lon, query } = req.query;

      if (!lat || !lon || !query) {
        res.status(400).json({ message: "lat, lon e query são obrigatórios" });
      }

      const results = await this.placesService.findNearbyPlaces(
        Number(lat),
        Number(lon),
        String(query)
      );

      if (results) {
        res.json(results);
      }

      res.status(200);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Erro ao buscar lugares próximos", error: err });
    }
  }
}
