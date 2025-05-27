import {
  Appointment,
  AppointmentCreationAttributes,
} from "../models/appointment.model";

export class AppointmentRepository {
  async createAppointment(
    data: AppointmentCreationAttributes
  ): Promise<Appointment> {
    return await Appointment.create(data);
  }

  async getAppointmentById(id: number): Promise<Appointment | null> {
    return await Appointment.findByPk(id);
  }

  async getAllAppointments(filters?: any): Promise<Appointment[]> {
    const where: any = {};

    if (filters?.userId) {
      where.patient_id = Number(filters.userId);
    }

    if (filters?.doctorId) {
      where.doctor_id = Number(filters.doctorId);
    }

    return await Appointment.findAll({ where });
  }

  async updateAppointment(
    id: number,
    data: Partial<Appointment>
  ): Promise<Appointment | null> {
    const [updated, [appointment]] = await Appointment.update(data, {
      where: { id },
      returning: true,
    });

    return updated ? appointment : null;
  }

  async getAppointmentsByPatientId(patientId: number | string) {
    if (!patientId || isNaN(Number(patientId))) {
      throw new Error("ID de paciente inválido");
    }

    return Appointment.findAll({
      where: { patient_id: patientId },
      order: [["appointment_date", "ASC"]],
    });
  }

  async deleteAppointment(id: number): Promise<void> {
    await Appointment.destroy({ where: { id } });
  }
}
