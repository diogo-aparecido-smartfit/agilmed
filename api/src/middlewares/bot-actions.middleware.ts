import { UserRepository } from "../repositories/user.repository";
import { AppointmentService } from "../services/appointment.service";
import { PlacesService } from "../services/places.service";
import { formatAppointmentDate } from "../utils";

interface IJWTUser {
  id: number;
  full_name: string;
  email: string;
  role: string;
}

const getDoctors = async (endpoint: string, user?: IJWTUser, payload?: any) => {
  const userRepository = new UserRepository();
  const params = new URLSearchParams(endpoint.split("?")[1]);
  const role = params.get("role");

  return {
    action: "getDoctors",
    data: await userRepository.getAllUsers(role || "doctor"),
  };
};

const getAppointments = async (
  endpoint: string,
  user?: IJWTUser,
  payload?: any
) => {
  const appointmentService = new AppointmentService();
  const params = new URLSearchParams(endpoint.split("?")[1]);
  const userId = params.get("userId");

  return {
    action: "getAppointments",
    data: await appointmentService.getAllAppointments({ userId }),
  };
};

const getNearbyPlaces = async (
  endpoint: string,
  user?: IJWTUser,
  payload?: any
) => {
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

const createAppointment = async (
  endpoint: string,
  user?: IJWTUser,
  payload?: any
) => {
  console.log("[bot-actions] createAppointment - endpoint:", endpoint);
  console.log("[bot-actions] createAppointment - user:", user);
  console.log("[bot-actions] createAppointment - payload:", payload);

  const appointmentService = new AppointmentService();

  if (!user && !payload) {
    throw new Error("Dados do agendamento não enviados");
  }

  if (!payload.doctor_id && !payload.doctor_name) {
    throw new Error("É necessário informar o id ou nome do médico");
  }

  if (!user?.id) {
    throw new Error("É necessário informar o id do paciente");
  }

  const servicePayload = {
    ...payload,
    doctor_name: payload.doctor_name,
    patient_name: user?.full_name || "",
    reason: payload.reason,
    status: "pending",
    patient_id: user?.id as number,
    appointment_date: formatAppointmentDate(payload.appointment_date),
  };

  console.log("[bot-actions] payload -  appointment:", servicePayload);

  const appointment = await appointmentService.createAppointment(
    servicePayload
  );

  console.log(
    "[bot-actions] createAppointment - created appointment:",
    appointment
  );

  return {
    action: "createAppointment",
    data: appointment,
  };
};

const actionsMap: Record<
  string,
  (endpoint: string, data?: any, payload?: any) => Promise<any>
> = {
  getDoctors: getDoctors,
  getAppointments: getAppointments,
  getNearbyPlaces: getNearbyPlaces,
  createAppointment: createAppointment,
};

export async function handleBotAction(
  action: string,
  endpoint: string,
  user?: IJWTUser,
  payload?: any
) {
  console.log(
    "[bot-actions] handleBotAction - action:",
    action,
    "endpoint:",
    endpoint,
    "user:",
    user,
    "payload:",
    payload
  );
  const actionKey = Object.keys(actionsMap).find((key) =>
    action.toLowerCase().includes(key.toLowerCase())
  );

  if (!actionKey) throw new Error("Ação não suportada");
  return actionsMap[actionKey](endpoint, user, payload);
}

export async function parseAndHandleBotAction(
  botMessage: string,
  user?: IJWTUser
): Promise<{ handled: boolean; result?: any }> {
  console.log(
    "[bot-actions] parseAndHandleBotAction - botMessage:",
    botMessage
  );

  let parsed: any = null;

  const jsonMatch = botMessage.match(/{[\s\S]*}$/m);
  if (jsonMatch) {
    try {
      parsed = JSON.parse(jsonMatch[0]);
      console.log("[bot-actions] parseAndHandleBotAction - parsed:", parsed);
    } catch {
      console.log("[bot-actions] parseAndHandleBotAction - JSON parse failed");
      return { handled: false };
    }
  } else {
    console.log(
      "[bot-actions] parseAndHandleBotAction - Nenhum JSON encontrado"
    );
    return { handled: false };
  }

  if (parsed && parsed.action) {
    const result = await handleBotAction(
      parsed.action,
      parsed.endpoint,
      user,
      parsed.payload
    );
    console.log(
      "[bot-actions] parseAndHandleBotAction - handled action, result:",
      result
    );
    return { handled: true, result };
  }

  console.log("[bot-actions] parseAndHandleBotAction - no action found");
  return { handled: false };
}
