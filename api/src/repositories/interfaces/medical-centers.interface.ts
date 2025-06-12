export interface IMedicalCentersRepository {
  getNearbyMedicalCenters(
    lat: number,
    lon: number,
    query: string
  ): Promise<any[]>;
}
