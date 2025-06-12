import Appointment, {
  AppointmentAttributes,
  AppointmentCreationAttributes,
  AppointmentFilters,
} from "../models/appointment.model";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { PatientRepository } from "../repositories/patient.repository";
import { DoctorRepository } from "../repositories/doctor.repository";
import { UserRepository } from "../repositories/user.repository";
import { IAppointmentRepository } from "../repositories/interfaces/appointment.interface";
import { IPatientRepository } from "../repositories/interfaces/patient.interface";
import { IDoctorRepository } from "../repositories/interfaces/doctor.interface";
import { IUserRepository } from "../repositories/interfaces/user.interface";

export class AppointmentService {
  private appointmentRepository: IAppointmentRepository;
  private patientRepository: IPatientRepository;
  private doctorRepository: IDoctorRepository;
  private userRepository: IUserRepository;

  constructor(
    appointmentRepository?: IAppointmentRepository,
    patientRepository?: IPatientRepository,
    doctorRepository?: IDoctorRepository,
    userRepository?: IUserRepository
  ) {
    this.appointmentRepository =
      appointmentRepository || new AppointmentRepository();
    this.patientRepository = patientRepository || new PatientRepository();
    this.doctorRepository = doctorRepository || new DoctorRepository();
    this.userRepository = userRepository || new UserRepository();
  }

  async createAppointment(
    data: AppointmentCreationAttributes
  ): Promise<Appointment> {
    try {
      console.log("Criando agendamento com dados:", data);

      const patient = await this.patientRepository.getPatientById(
        data.patient_id
      );

      if (!patient) {
        console.error(`Paciente ID ${data.patient_id} não encontrado`);
        throw new Error("Paciente não encontrado");
      }

      console.log(`Paciente encontrado: ${patient.user?.full_name}`);

      let doctor;

      if (data.doctor_id) {
        doctor = await this.doctorRepository.getDoctorById(data.doctor_id);
      } else if ((data as any).doctor_name) {
        const doctorUsers = await this.userRepository.findAll({
          role: "doctor",
          name: (data as any).doctor_name,
        });

        if (doctorUsers.length > 0) {
          doctor = await this.doctorRepository.getDoctorByUserId(
            doctorUsers[0].id
          );
        }
      } else {
        throw new Error("É necessário informar o ID ou nome do médico");
      }

      if (!doctor) {
        console.error(
          `Médico não encontrado (ID: ${data.doctor_id}, Nome: ${
            (data as any).doctor_name
          })`
        );
        throw new Error("Médico não encontrado");
      }

      console.log(`Médico encontrado: ${doctor.user?.full_name}`);

      const appointmentData: AppointmentCreationAttributes = {
        doctor_id: doctor.id,
        patient_id: patient.id,
        appointment_date: data.appointment_date,
        reason: data.reason,
        status: data.status || "pending",
        notes: data.notes,
      };

      console.log("Dados do agendamento a ser criado:", appointmentData);

      const appointment = await this.appointmentRepository.createAppointment(
        appointmentData
      );
      console.log(`Agendamento criado com ID: ${appointment.id}`);

      return this.getAppointmentById(appointment.id) as Promise<Appointment>;
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      throw error;
    }
  }

  async getAppointmentById(id: number): Promise<Appointment | null> {
    try {
      return this.appointmentRepository.getAppointmentById(id);
    } catch (error) {
      console.error(`Erro ao buscar agendamento ID ${id}:`, error);
      throw error;
    }
  }

  async getAllAppointments(
    filters: AppointmentFilters = {}
  ): Promise<Appointment[]> {
    try {
      return this.appointmentRepository.getAllAppointments(filters);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      throw error;
    }
  }

  async updateAppointment(
    id: number,
    data: Partial<AppointmentAttributes>
  ): Promise<Appointment | null> {
    try {
      return this.appointmentRepository.updateAppointment(id, data);
    } catch (error) {
      console.error(`Erro ao atualizar agendamento ID ${id}:`, error);
      throw error;
    }
  }

  async getAppointmentsForUser(userId: number): Promise<Appointment[]> {
    try {
      return this.appointmentRepository.getAppointmentsForUser(userId);
    } catch (error) {
      console.error(
        `Erro ao buscar agendamentos para usuário ${userId}:`,
        error
      );
      throw error;
    }
  }

  async deleteAppointment(id: number): Promise<boolean> {
    try {
      return this.appointmentRepository.deleteAppointment(id);
    } catch (error) {
      console.error(`Erro ao deletar agendamento ID ${id}:`, error);
      throw error;
    }
  }
}
