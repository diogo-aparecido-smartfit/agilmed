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

  async getAllAppointments(): Promise<Appointment[]> {
    return await Appointment.findAll();
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

  async deleteAppointment(id: number): Promise<void> {
    await Appointment.destroy({ where: { id } });
  }
}
