import { PatientRepository } from "../repositories/patient.repository";
import { UserRepository } from "../repositories/user.repository";
import {
  Patient,
  PatientAttributes,
  PatientCreationAttributes,
  PatientFilters,
} from "../models/patient.model";
import { UserCreationAttributes } from "../models/user.model";

export class PatientService {
  private patientRepository: PatientRepository;
  private userRepository: UserRepository;

  constructor(
    patientRepository?: PatientRepository,
    userRepository?: UserRepository
  ) {
    this.patientRepository = patientRepository || new PatientRepository();
    this.userRepository = userRepository || new UserRepository();
  }

  async createPatient(
    combinedData: UserCreationAttributes & PatientCreationAttributes
  ) {
    try {
      const {
        full_name,
        email,
        password,
        cpf,
        phone,
        role,
        verificationCode,
        ...patientData
      } = combinedData;

      const userData: UserCreationAttributes = {
        full_name,
        email,
        password,
        cpf,
        phone,
        role: role || "patient",
        verificationCode,
        isVerified: false,
      };

      return this.patientRepository.createPatient(userData, patientData);
    } catch (error) {
      console.error("Erro ao criar paciente:", error);
      throw error;
    }
  }

  async getPatientById(id: number): Promise<Patient | null> {
    try {
      return this.patientRepository.getPatientById(id);
    } catch (error) {
      console.error(`Erro ao buscar paciente ID ${id}:`, error);
      throw error;
    }
  }

  async getPatientByUserId(userId: number): Promise<Patient | null> {
    try {
      return this.patientRepository.getPatientByUserId(userId);
    } catch (error) {
      console.error(
        `Erro ao buscar paciente por ID de usuário ${userId}:`,
        error
      );
      throw error;
    }
  }

  async getPatientByCpf(cpf: string): Promise<Patient | null> {
    try {
      return this.patientRepository.getPatientByCpf(cpf);
    } catch (error) {
      console.error(`Erro ao buscar paciente por CPF ${cpf}:`, error);
      throw error;
    }
  }

  async updatePatient(
    id: number,
    data: Partial<PatientAttributes>
  ): Promise<Patient | null> {
    try {
      if (
        data.user?.full_name ||
        data.user?.email ||
        data.user?.phone ||
        data.user?.profile_picture_url
      ) {
        const patient = await this.patientRepository.getPatientById(id);

        if (patient && patient.user_id) {
          const userData = removeEmptyFields({
            full_name: data.user?.full_name,
            cpf: data.user?.cpf,
            email: data.user?.email,
            phone: data.user?.phone,
            profile_picture_url: data.user?.profile_picture_url,
          });

          if (Object.keys(userData).length > 0) {
            await this.userRepository.updateUser(patient.user_id, userData);
          }
        }
      }

      const { user, ...patientData } = data;

      if (Object.keys(patientData).length > 0) {
        const filteredPatientData = removeEmptyFields(patientData);
        return this.patientRepository.updatePatient(id, filteredPatientData);
      }

      return this.patientRepository.getPatientById(id);
    } catch (error) {
      console.error(`Erro ao atualizar paciente ID ${id}:`, error);
      throw error;
    }
  }

  async getAllPatients(filters?: PatientFilters): Promise<Patient[]> {
    try {
      return this.patientRepository.getAllPatients(filters);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
      throw error;
    }
  }

  async deletePatient(id: number): Promise<boolean> {
    try {
      await this.patientRepository.deletePatient(id);
      return true;
    } catch (error) {
      console.error(`Erro ao excluir paciente ID ${id}:`, error);
      throw error;
    }
  }
}

function removeEmptyFields(obj: any): any {
  return Object.entries(obj)
    .filter(([_, v]) => v !== null && v !== undefined)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}
