import Appointment, {
  AppointmentAttributes,
  AppointmentCreationAttributes,
  AppointmentFilters,
} from "../../models/appointment.model";
import { IRepository } from "./repository.interface";

export interface IAppointmentRepository extends IRepository<Appointment> {
  getAppointmentById(id: number): Promise<Appointment | null>;
  createAppointment(data: AppointmentCreationAttributes): Promise<Appointment>;
  updateAppointment(
    id: number,
    data: Partial<AppointmentAttributes>
  ): Promise<Appointment | null>;
  deleteAppointment(id: number): Promise<boolean>;
  getAllAppointments(filters?: AppointmentFilters): Promise<Appointment[]>;
  getAppointmentsByDoctorId(doctorId: number): Promise<Appointment[]>;
  getAppointmentsByPatientId(patientId: number): Promise<Appointment[]>;
  getAppointmentsForUser(userId: number): Promise<Appointment[]>;
}
