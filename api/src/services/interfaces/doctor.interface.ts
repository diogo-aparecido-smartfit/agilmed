import {
  DoctorAttributes,
  DoctorCreationAttributes,
  DoctorFilters,
} from "../../models/doctor.model";
import { UserCreationAttributes } from "../../models/user.model";

export interface IDoctorService {
  createDoctor(
    userData: UserCreationAttributes,
    doctorData: Omit<DoctorCreationAttributes, "user_id">
  ): Promise<any>;
  getDoctorById(id: number): Promise<any>;
  getDoctorByUserId(userId: number): Promise<any>;
  updateDoctor(id: number, data: Partial<DoctorAttributes>): Promise<any>;
  deleteDoctor(id: number): Promise<boolean>;
  getAllDoctors(filters?: DoctorFilters): Promise<any[]>;
}
