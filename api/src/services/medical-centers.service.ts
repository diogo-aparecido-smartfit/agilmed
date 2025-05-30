import { MedicalCentersRepository } from "../repositories/medical-centers.repository";

export class MedicalCentersService {
  private medicalCentersRepository: MedicalCentersRepository;

  constructor() {
    this.medicalCentersRepository = new MedicalCentersRepository();
  }

  async findNearbyPlaces(lat: number, lon: number, query: string) {
    return await this.medicalCentersRepository.getNearbyMedicalCenters(
      lat,
      lon,
      query
    );
  }
}
