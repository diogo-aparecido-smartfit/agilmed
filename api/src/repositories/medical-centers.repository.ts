import axios from "axios";
import { IMedicalCentersRepository } from "./interfaces/medical-centers.interface";

export class MedicalCentersRepository implements IMedicalCentersRepository {
  private readonly baseUrl = "https://atlas.microsoft.com/search/poi/json";
  private readonly apiKey = process.env.AZURE_MAPS_KEY!;

  async getNearbyMedicalCenters(
    lat: number,
    lon: number,
    query: string
  ): Promise<any[]> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          "api-version": "1.0",
          "subscription-key": this.apiKey,
          query,
          lat,
          lon,
          radius: 1000,
          limit: 10,
        },
      });

      return response.data.results || [];
    } catch (error) {
      console.error("Erro ao buscar centros médicos próximos:", error);
      return [];
    }
  }
}
