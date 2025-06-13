export interface IMedicalCentersService {
  findNearbyPlaces(lat: number, lon: number, query: string): Promise<any[]>;
}
