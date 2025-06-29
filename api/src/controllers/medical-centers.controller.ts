import { Request, Response } from "express";
import { MedicalCentersService } from "../services/medical-centers.service";
import { IMedicalCentersService } from "../services/interfaces/medical-centers.interface";

export class MedicalCentersController {
  constructor(private medicalCentersService: IMedicalCentersService) {}

  async getNearbyPlaces(req: Request, res: Response) {
    try {
      const { lat, lon, query } = req.query;

      if (!lat || !lon || !query) {
        const results = await this.medicalCentersService.findNearbyPlaces(
          Number(-18.912249556811037),
          Number(-48.2741967117477),
          String("pharmacy")
        );

        if (results) {
          res.json(results);
          return;
        }

        res.status(400).json({ message: "lat, lon e query são obrigatórios" });
        return;
      }

      const results = await this.medicalCentersService.findNearbyPlaces(
        Number(lat),
        Number(lon),
        String(query)
      );

      if (results) {
        res.json(results);
        return;
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
