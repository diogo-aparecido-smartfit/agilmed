import {
  AppointmentAttributes,
  AppointmentCreationAttributes,
  AppointmentFilters,
} from "../../models/appointment.model";

export interface IAppointmentService {
  getAppointmentById(id: number): Promise<any>;
  createAppointment(data: AppointmentCreationAttributes): Promise<any>;
  updateAppointment(
    id: number,
    data: Partial<AppointmentAttributes>
  ): Promise<any>;
  deleteAppointment(id: number): Promise<boolean>;
  getAllAppointments(filters?: AppointmentFilters): Promise<any[]>;
  getAppointmentsForUser(userId: number): Promise<any[]>;
}
