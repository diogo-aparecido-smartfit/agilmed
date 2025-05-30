import { PatientRepository } from "../repositories/patient.repository";
import bcrypt from "bcryptjs";

export class PatientService {
  private patientRepository: PatientRepository;

  constructor() {
    this.patientRepository = new PatientRepository();
  }

  async createPatient(data: any) {
    const userData = {
      full_name: data.full_name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      profile_picture_url: data.profile_picture_url,
      role: "patient",
    };

    const patientData = {
      birthdate: data.birthdate,
      cpf: data.cpf,
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

      if (patient && patient.user) {
        const userData = {
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          profile_picture_url: data.profile_picture_url,
        };

        // Aqui você precisaria de um userRepository
        // await userRepository.updateUser(patient.user_id, userData);
      }
    }

    // Atualizar dados específicos do paciente
    const patientData = {
      birthdate: data.birthdate,
      cpf: data.cpf,
      address: data.address,
      city: data.city,
      state: data.state,
      gender: data.gender,
      blood_type: data.blood_type,
      allergies: data.allergies,
      medical_history: data.medical_history,
    };

    return this.patientRepository.updatePatient(id, patientData);
  }

  async getAllPatients(filters?: any) {
    return this.patientRepository.getAllPatients(filters);
  }

  async deletePatient(id: number) {
    return this.patientRepository.deletePatient(id);
  }
}
