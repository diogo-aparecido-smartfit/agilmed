import { PatientRepository } from "../repositories/patient.repository";
import { UserRepository } from "../repositories/user.repository";
import { removeEmptyFields } from "../utils";

export class PatientService {
  private patientRepository: PatientRepository;
  private userRepository: UserRepository;

  constructor() {
    this.patientRepository = new PatientRepository();
    this.userRepository = new UserRepository();
  }

  async createPatient(data: any) {
    const userData = {
      full_name: data.full_name,
      email: data.email,
      cpf: data.cpf,
      password: data.password,
      phone: data.phone,
      profile_picture_url: data.profile_picture_url,
      role: "patient",
    };

    const patientData = {
      birthdate: data.birthdate,
      address: data.address,
      city: data.city,
      state: data.state,
      gender: data.gender,
      blood_type: data.blood_type,
      allergies: data.allergies,
      medical_history: data.medical_history,
    };

    return this.patientRepository.createPatient(userData, patientData);
  }

  async getPatientById(id: number) {
    return this.patientRepository.getPatientById(id);
  }

  async getPatientByUserId(userId: number) {
    return this.patientRepository.getPatientByUserId(userId);
  }

  async updatePatient(id: number, data: any) {
    if (
      data.full_name ||
      data.email ||
      data.phone ||
      data.profile_picture_url
    ) {
      const patient = await this.patientRepository.getPatientById(id);

      if (patient && patient.user_id) {
        const userData = removeEmptyFields({
          full_name: data.full_name,
          cpf: data.cpf,
          email: data.email,
          phone: data.phone,
          profile_picture_url: data.profile_picture_url,
        });

        if (Object.keys(userData).length > 0) {
          await this.userRepository.updateUser(patient.user_id, userData);
        }
      }
    }

    const patientData = removeEmptyFields({
      birthdate: data.birthdate,
      address: data.address,
      city: data.city,
      state: data.state,
      gender: data.gender,
      blood_type: data.blood_type,
      allergies: data.allergies,
      medical_history: data.medical_history,
    });

    if (Object.keys(patientData).length > 0) {
      return this.patientRepository.updatePatient(id, patientData);
    }

    return this.patientRepository.getPatientById(id);
  }

  async getAllPatients(filters?: any) {
    return this.patientRepository.getAllPatients(filters);
  }

  async deletePatient(id: number) {
    return this.patientRepository.deletePatient(id);
  }

  async getPatientByCpf(cpf: string) {
    return this.patientRepository.getPatientByCpf(cpf);
  }
}
