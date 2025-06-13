import {
  PatientAttributes,
  PatientCreationAttributes,
  PatientFilters,
} from "../../models/patient.model";
import { UserCreationAttributes } from "../../models/user.model";

export interface IPatientService {
  getPatientById(id: number): Promise<any>;
  getPatientByUserId(userId: number): Promise<any>;
  createPatient(
    combinedData: UserCreationAttributes & PatientCreationAttributes
  ): Promise<any>;
  updatePatient(id: number, data: Partial<PatientAttributes>): Promise<any>;
  deletePatient(id: number): Promise<boolean>;
  getAllPatients(filters?: PatientFilters): Promise<any[]>;
}
