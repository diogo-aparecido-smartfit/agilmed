import { User, UserCreationAttributes } from "../../models/user.model";
import {
  Patient,
  PatientAttributes,
  PatientCreationAttributes,
  PatientFilters,
} from "../../models/patient.model";
import { IRepository } from "./repository.interface";

export interface IPatientRepository extends IRepository<Patient> {
  createPatient(
    userData: UserCreationAttributes,
    patientData: PatientCreationAttributes
  ): Promise<{ user: User; patient: Patient }>;
  getPatientById(id: number): Promise<Patient | null>;
  getPatientByUserId(userId: number): Promise<Patient | null>;
  updatePatient(
    id: number,
    data: Partial<PatientAttributes>
  ): Promise<Patient | null>;
  getAllPatients(filters?: PatientFilters): Promise<Patient[]>;
  deletePatient(id: number): Promise<void>;
  getPatientByCpf(cpf: string): Promise<Patient | null>;
}
