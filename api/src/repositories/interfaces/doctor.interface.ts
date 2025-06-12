import { User, UserCreationAttributes } from "../../models/user.model";
import {
  Doctor,
  DoctorAttributes,
  DoctorCreationAttributes,
  DoctorFilters,
} from "../../models/doctor.model";
import { IRepository } from "./repository.interface";

export interface IDoctorRepository extends IRepository<Doctor> {
  createDoctor(
    userData: UserCreationAttributes,
    doctorData: DoctorCreationAttributes
  ): Promise<{ user: User; doctor: Doctor }>;
  getDoctorById(id: number): Promise<Doctor | null>;
  getDoctorByUserId(userId: number): Promise<Doctor | null>;
  updateDoctor(
    id: number,
    data: Partial<DoctorAttributes>
  ): Promise<Doctor | null>;
  getAllDoctors(filters?: DoctorFilters): Promise<Doctor[]>;
  deleteDoctor(id: number): Promise<void>;
  getDoctorByCpf(cpf: string): Promise<Doctor | null>;
  getDoctorByCRM(crm: string): Promise<Doctor | null>;
}
