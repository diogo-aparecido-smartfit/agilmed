import { UserRepository } from "../repositories/user.repository";
import { AppointmentService } from "../services/appointment.service";
import { PlacesService } from "../services/places.service";

const getDoctors = async (endpoint: string) => {
  const userRepository = new UserRepository();
  const params = new URLSearchParams(endpoint.split("?")[1]);
  const role = params.get("role");

  return {
    action: "getDoctors",
    data: await userRepository.getAllUsers(role || "doctor"),
  };
};

const getAppointments = async (endpoint: string, data?: any) => {
  const appointmentService = new AppointmentService();
  const params = new URLSearchParams(endpoint.split("?")[1]);
  const userId = params.get("userId");

  return {
    action: "getAppointments",
    data: await appointmentService.getAllAppointments({ userId }),
  };
};

const getNearbyPlaces = async (endpoint: string, data?: any) => {
  const placesService = new PlacesService();
  const params = new URLSearchParams(endpoint.split("?")[1]);
  const lat = Number(params.get("lat"));
  const lon = Number(params.get("lon"));
  const query = params.get("query") || "";

  return {
    action: "getNearbyPlaces",
    data: await placesService.findNearbyPlaces(lat, lon, query),
  };
};

const actionsMap: Record<
  string,
  (endpoint: string, data?: any) => Promise<any>
> = {
  getDoctors: getDoctors,
  getAppointments: getAppointments,
  getNearbyPlaces: getNearbyPlaces,
};

export async function handleBotAction(
  action: string,
  endpoint: string,
  data?: any
) {
  console.log("action: ", action);

  const fn = actionsMap[action];
  if (!fn) throw new Error("Ação não suportada");
  return fn(endpoint, data);
}
