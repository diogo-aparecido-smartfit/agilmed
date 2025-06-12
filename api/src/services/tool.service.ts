import { AppointmentService } from "./appointment.service";
import { DoctorService } from "./doctor.service";
import { MedicalCentersService } from "./medical-centers.service";

/**
 * Serviço para execução das ferramentas de IA
 */
export class ToolService {
  private doctorService: DoctorService;
  private medicalCentersService: MedicalCentersService;
  private appointmentService: AppointmentService;

  constructor() {
    this.doctorService = new DoctorService();
    this.medicalCentersService = new MedicalCentersService();
    this.appointmentService = new AppointmentService();
  }

  /**
   * Executa a ferramenta adequada com base no nome
   */
  async executeTool(toolName: string, args: any): Promise<any> {
    switch (toolName) {
      case "list_doctors":
        return this.executeDoctorListing(args);
      case "find_nearby_places":
        return this.executeFindNearbyPlaces(args);
      case "create_appointment":
        return this.executeCreateAppointment(args);
      default:
        return {
          error: `Ferramenta "${toolName}" não implementada`,
        };
    }
  }

  /**
   * Lista médicos disponíveis
   */
  private async executeDoctorListing(args: any) {
    try {
      const { specialty } = args;
      const params = specialty ? { specialty } : {};
      const doctors = await this.doctorService.getAllDoctors(params);

      if (!doctors || doctors.length === 0) {
        return {
          message: `Não encontrei médicos${
            specialty ? ` da especialidade ${specialty}` : ""
          } disponíveis no momento.`,
          doctors: [],
        };
      }

      return {
        message: `Encontrei ${doctors.length} médicos${
          specialty ? ` da especialidade ${specialty}` : ""
        }.`,
        doctors: doctors,
      };
    } catch (error) {
      console.error("Erro ao listar médicos:", error);
      return {
        error: "Não foi possível obter a lista de médicos.",
        doctors: [],
      };
    }
  }

  /**
   * Encontra estabelecimentos próximos
   */
  private async executeFindNearbyPlaces(args: any) {
    try {
      const {
        query,
        lat = -18.91225967038251,
        lon = -48.27427181810462,
      } = args;
      const places = await this.medicalCentersService.findNearbyPlaces(
        lat,
        lon,
        query
      );

      if (!places || places.length === 0) {
        return {
          message: `Não encontrei ${query} próximos à sua localização.`,
          places: [],
        };
      }

      return {
        message: `Encontrei ${places.length} ${query} próximos à sua localização.`,
        places: places,
      };
    } catch (error) {
      console.error("Erro ao buscar lugares próximos:", error);
      return {
        error: `Não foi possível encontrar ${args.query} próximos.`,
        places: [],
      };
    }
  }

  /**
   * Cria um novo agendamento
   */
  private async executeCreateAppointment(args: any) {
    try {
      const { doctor_id, patient_id, appointment_date, reason } = args;

      if (!doctor_id || !patient_id || !appointment_date || !reason) {
        return {
          success: false,
          error: "Dados incompletos para criar o agendamento.",
        };
      }

      const result = await this.appointmentService.createAppointment({
        doctor_id,
        patient_id,
        appointment_date,
        reason,
        status: "pending",
      });

      return {
        success: true,
        message: "Agendamento criado com sucesso!",
        appointment: result,
      };
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      return {
        success: false,
        error: "Não foi possível criar o agendamento.",
      };
    }
  }
}
