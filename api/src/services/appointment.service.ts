import { Op } from "sequelize";
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

  async createAppointment(
    data: AppointmentCreationAttributes & { doctor_name?: string }
  ) {
    const patient = await User.findByPk(data.patient_id);
    if (!patient) throw new Error("Paciente não encontrado");

    let doctor;

    if (data.doctor_id) {
      doctor = await User.findOne({
        where: { id: data.doctor_id, role: "doctor" },
      });
    } else if (data.doctor_name) {
      doctor = await User.findOne({
        where: {
          role: "doctor",
          full_name: { [Op.like]: `%${data.doctor_name}%` },
        },
        order: [["full_name", "ASC"]],
      });
    } else {
      throw new Error("É necessário informar o id ou nome do médico");
    }

    if (!doctor) throw new Error("Médico não encontrado");

    const payload = {
      ...data,
      doctor_id: doctor.id,
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
