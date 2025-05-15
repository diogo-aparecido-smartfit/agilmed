import { PlacesRepository } from "../repositories/places.repository";

export class PlacesService {
  private placesRepository: PlacesRepository;

  constructor() {
    this.placesRepository = new PlacesRepository();
  }

  async findNearbyPlaces(lat: number, lon: number, query: string) {
    return await this.placesRepository.getNearbyPlaces(lat, lon, query);
  }
}
