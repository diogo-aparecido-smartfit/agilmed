import {
  Appointment,
  AppointmentCreationAttributes,
} from "../models/appointment.model";
import { AppointmentRepository } from "../repositories/appointment.repository";

export class AppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor() {
    this.appointmentRepository = new AppointmentRepository();
  }

  async createAppointment(data: AppointmentCreationAttributes) {
    return this.appointmentRepository.createAppointment(data);
  }

  async getAppointmentById(id: number) {
    return this.appointmentRepository.getAppointmentById(id);
  }

  async getAllAppointments(filters?: any) {
    return this.appointmentRepository.getAllAppointments(filters);
  }

  async updateAppointment(id: number, data: Partial<Appointment>) {
    return this.appointmentRepository.updateAppointment(id, data);
  }

  async getAppointmentsForUser(userId: number) {
    return this.appointmentRepository.getAppointmentsByPatientId(userId);
  }

  async deleteAppointment(id: number) {
    return this.appointmentRepository.deleteAppointment(id);
  }
}
