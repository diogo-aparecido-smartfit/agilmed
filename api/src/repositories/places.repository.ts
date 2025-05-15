import axios from "axios";

export class PlacesRepository {
  private readonly baseUrl = "https://atlas.microsoft.com/search/poi/json";
  private readonly apiKey = process.env.AZURE_MAPS_KEY!;

  async getNearbyPlaces(lat: number, lon: number, query: string) {
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

    return response.data.results;
  }
}
