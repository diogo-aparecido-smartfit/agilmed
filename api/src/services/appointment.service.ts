import {
  Appointment,
  AppointmentCreationAttributes,
} from "../models/appointment.model";
import { User } from "../models/user.model";
import { AppointmentRepository } from "../repositories/appointment.repository";

export class AppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor() {
    this.appointmentRepository = new AppointmentRepository();
  }

  async createAppointment(data: AppointmentCreationAttributes) {
    const patient = await User.findByPk(data.patient_id);
    if (!patient) throw new Error("Paciente não encontrado");

    const doctor = await User.findByPk(data.doctor_id);
    if (!doctor) throw new Error("Médico não encontrado");

    const payload = {
      ...data,
      patient_name: patient.full_name,
      doctor_name: doctor.full_name,
    };

    return this.appointmentRepository.createAppointment(payload);
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
