import {
  PatientAttributes,
  PatientCreationAttributes,
} from "../../models/patient.model";
import { UserCreationAttributes } from "../../models/user.model";

export interface IPatientService {
  getPatientById(id: number): Promise<any>;
  getPatientByUserId(userId: number): Promise<any>;
  createPatient(
    userData: UserCreationAttributes,
    patientData: Omit<PatientCreationAttributes, "user_id">
  ): Promise<any>;
  updatePatient(id: number, data: Partial<PatientAttributes>): Promise<any>;
  deletePatient(id: number): Promise<boolean>;
  getAllPatients(): Promise<any[]>;
}
