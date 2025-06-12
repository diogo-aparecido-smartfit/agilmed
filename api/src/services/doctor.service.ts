import { DoctorRepository } from "../repositories/doctor.repository";
import { UserRepository } from "../repositories/user.repository";
import {
  Doctor,
  DoctorAttributes,
  DoctorCreationAttributes,
  DoctorFilters,
} from "../models/doctor.model";
import { UserCreationAttributes } from "../models/user.model";

export class DoctorService {
  private doctorRepository: DoctorRepository;
  private userRepository: UserRepository;

  constructor(
    doctorRepository?: DoctorRepository,
    userRepository?: UserRepository
  ) {
    this.doctorRepository = doctorRepository || new DoctorRepository();
    this.userRepository = userRepository || new UserRepository();
  }

  async createDoctor(
    userData: UserCreationAttributes,
    doctorData: Omit<DoctorCreationAttributes, "user_id">
  ) {
    try {
      return this.doctorRepository.createDoctor(
        userData,
        doctorData as DoctorCreationAttributes
      );
    } catch (error) {
      console.error("Erro ao criar médico:", error);
      throw error;
    }
  }

  async getDoctorById(id: number): Promise<Doctor | null> {
    try {
      return this.doctorRepository.getDoctorById(id);
    } catch (error) {
      console.error(`Erro ao buscar médico ID ${id}:`, error);
      throw error;
    }
  }

  async getDoctorByUserId(userId: number): Promise<Doctor | null> {
    try {
      return this.doctorRepository.getDoctorByUserId(userId);
    } catch (error) {
      console.error(
        `Erro ao buscar médico por ID de usuário ${userId}:`,
        error
      );
      throw error;
    }
  }

  async getDoctorByCpf(cpf: string): Promise<Doctor | null> {
    try {
      return this.doctorRepository.getDoctorByCpf(cpf);
    } catch (error) {
      console.error(`Erro ao buscar médico por CPF ${cpf}:`, error);
      throw error;
    }
  }

  async getDoctorByCRM(crm: string): Promise<Doctor | null> {
    try {
      return this.doctorRepository.getDoctorByCRM(crm);
    } catch (error) {
      console.error(`Erro ao buscar médico por CRM ${crm}:`, error);
      throw error;
    }
  }

  async updateDoctor(
    id: number,
    data: Partial<DoctorAttributes>
  ): Promise<Doctor | null> {
    try {
      return this.doctorRepository.updateDoctor(id, data);
    } catch (error) {
      console.error(`Erro ao atualizar médico ID ${id}:`, error);
      throw error;
    }
  }

  async getAllDoctors(filters?: DoctorFilters): Promise<Doctor[]> {
    try {
      return this.doctorRepository.getAllDoctors(filters);
    } catch (error) {
      console.error("Erro ao buscar médicos:", error);
      throw error;
    }
  }

  async deleteDoctor(id: number): Promise<boolean> {
    try {
      await this.doctorRepository.deleteDoctor(id);
      return true;
    } catch (error) {
      console.error(`Erro ao excluir médico ID ${id}:`, error);
      throw error;
    }
  }
}
