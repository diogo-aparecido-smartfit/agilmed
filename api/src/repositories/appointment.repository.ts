import { Op } from "sequelize";
import Appointment, {
  AppointmentAttributes,
  AppointmentCreationAttributes,
  AppointmentFilters,
} from "../models/appointment.model";
import { Doctor } from "../models/doctor.model";
import { Patient } from "../models/patient.model";
import { User } from "../models/user.model";
import { BaseRepository } from "./base.repository";
import { IAppointmentRepository } from "./interfaces/appointment.interface";

export class AppointmentRepository
  extends BaseRepository<Appointment>
  implements IAppointmentRepository
{
  constructor() {
    super(Appointment);
  }

  async getAppointmentById(id: number): Promise<Appointment | null> {
    return Appointment.findByPk(id, {
      include: [
        {
          model: Doctor,
          as: "doctor",
          include: [{ model: User, as: "user" }],
        },
        {
          model: Patient,
          as: "patient",
          include: [{ model: User, as: "user" }],
        },
      ],
    });
  }

  async createAppointment(
    data: AppointmentCreationAttributes
  ): Promise<Appointment> {
    return Appointment.create(data);
  }

  async updateAppointment(
    id: number,
    data: Partial<AppointmentAttributes>
  ): Promise<Appointment | null> {
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return null;
    }

    await appointment.update(data);
    return this.getAppointmentById(id);
  }

  async deleteAppointment(id: number): Promise<boolean> {
    const result = await Appointment.destroy({
      where: { id },
    });

    return result > 0;
  }

  async getAllAppointments(
    filters: AppointmentFilters = {}
  ): Promise<Appointment[]> {
    const where: any = {};

    if (filters.doctor_id) {
      where.doctor_id = filters.doctor_id;
    }

    if (filters.patient_id) {
      where.patient_id = filters.patient_id;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    // Filtro por data
    if (filters.date) {
      const date = new Date(filters.date);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);

      where.appointment_date = {
        [Op.gte]: date,
        [Op.lt]: nextDay,
      };
    }

    // Filtro por período
    if (filters.start_date && filters.end_date) {
      where.appointment_date = {
        [Op.between]: [
          new Date(filters.start_date),
          new Date(filters.end_date),
        ],
      };
    } else if (filters.start_date) {
      where.appointment_date = {
        [Op.gte]: new Date(filters.start_date),
      };
    } else if (filters.end_date) {
      where.appointment_date = {
        [Op.lte]: new Date(filters.end_date),
      };
    }

    return Appointment.findAll({
      where,
      include: [
        {
          model: Doctor,
          as: "doctor",
          include: [{ model: User, as: "user" }],
        },
        {
          model: Patient,
          as: "patient",
          include: [{ model: User, as: "user" }],
        },
      ],
      order: [["appointment_date", "ASC"]],
    });
  }

  async getAppointmentsByDoctorId(doctorId: number): Promise<Appointment[]> {
    return Appointment.findAll({
      where: { doctor_id: doctorId },
      include: [
        {
          model: Patient,
          as: "patient",
          include: [{ model: User, as: "user" }],
        },
      ],
      order: [["appointment_date", "ASC"]],
    });
  }

  async getAppointmentsByPatientId(patientId: number): Promise<Appointment[]> {
    return Appointment.findAll({
      where: { patient_id: patientId },
      include: [
        {
          model: Doctor,
          as: "doctor",
          include: [{ model: User, as: "user" }],
        },
      ],
      order: [["appointment_date", "ASC"]],
    });
  }

  async getAppointmentsForUser(userId: number): Promise<Appointment[]> {
    const patient = await Patient.findOne({
      where: { user_id: userId },
    });

    const doctor = await Doctor.findOne({
      where: { user_id: userId },
    });

    if (patient) {
      return this.getAppointmentsByPatientId(patient.id);
    }

    if (doctor) {
      return this.getAppointmentsByDoctorId(doctor.id);
    }

    return [];
  }
}
