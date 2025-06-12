import { IMedicalCentersRepository } from "../repositories/interfaces/medical-centers.interface";
import { MedicalCentersRepository } from "../repositories/medical-centers.repository";

export class MedicalCentersService {
  private medicalCentersRepository: IMedicalCentersRepository;

  constructor(medicalCentersRepository?: IMedicalCentersRepository) {
    this.medicalCentersRepository =
      medicalCentersRepository || new MedicalCentersRepository();
  }

  async findNearbyPlaces(lat: number, lon: number, query: string) {
    try {
      return this.medicalCentersRepository.getNearbyMedicalCenters(
        lat,
        lon,
        query
      );
    } catch (error) {
      console.error("Erro ao buscar centros médicos próximos:", error);
      return [];
    }
  }
}
