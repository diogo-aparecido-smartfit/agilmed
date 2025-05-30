import { DoctorRepository } from "../repositories/doctor.repository";
import { UserRepository } from "../repositories/user.repository";
import { removeEmptyFields } from "../utils";
import { Doctor } from "../models/doctor.model";
import { User } from "../models/user.model";

export class DoctorService {
  private doctorRepository: DoctorRepository;
  private userRepository: UserRepository;

  constructor() {
    this.doctorRepository = new DoctorRepository();
    this.userRepository = new UserRepository();
  }

  async createDoctor(data: any) {
    const userData = {
      full_name: data.full_name,
      email: data.email,
      password: data.password,
      cpf: data.cpf,
      phone: data.phone,
      profile_picture_url: data.profile_picture_url,
      role: "doctor",
    };

    const doctorData = {
      specialty: data.specialty,
      crm: data.crm,
      birthdate: data.birthdate,

      address: data.address,
      city: data.city,
      state: data.state,
      gender: data.gender,
      bio: data.bio,
      available_hours: data.available_hours,
    };

    return this.doctorRepository.createDoctor(userData, doctorData);
  }

  async getDoctorById(id: number): Promise<Doctor | null> {
    return this.doctorRepository.getDoctorById(id);
  }

  async getDoctorByUserId(userId: number): Promise<Doctor | null> {
    return this.doctorRepository.getDoctorByUserId(userId);
  }

  async getDoctorByCpf(cpf: string): Promise<Doctor | null> {
    return this.doctorRepository.getDoctorByCpf(cpf);
  }

  async updateDoctor(id: number, data: any) {
    if (
      data.full_name ||
      data.email ||
      data.phone ||
      data.profile_picture_url
    ) {
      const doctor = await this.doctorRepository.getDoctorById(id);

      if (doctor && doctor.user_id) {
        const userData = removeEmptyFields({
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          cpf: data.cpf,
          profile_picture_url: data.profile_picture_url,
        });

        if (Object.keys(userData).length > 0) {
          await this.userRepository.updateUser(doctor.user_id, userData);
        }
      }
    }

    const doctorData = removeEmptyFields({
      specialty: data.specialty,
      crm: data.crm,
      birthdate: data.birthdate,

      address: data.address,
      city: data.city,
      state: data.state,
      gender: data.gender,
      bio: data.bio,
      available_hours: data.available_hours,
    });

    if (Object.keys(doctorData).length > 0) {
      return this.doctorRepository.updateDoctor(id, doctorData);
    }

    return this.doctorRepository.getDoctorById(id);
  }

  async getAllDoctors(filters?: any) {
    return this.doctorRepository.getAllDoctors(filters);
  }

  async deleteDoctor(id: number) {
    const doctor = await this.doctorRepository.getDoctorById(id);
    if (!doctor) {
      return false;
    }

    await this.doctorRepository.deleteDoctor(id);

    if (doctor.user_id) {
      await this.userRepository.deleteUser(doctor.user_id);
    }

    return true;
  }

  /**
   * Método para retornar informações completas do médico
   * Combina dados do usuário e do médico em um único objeto
   */
  async getDoctorCompleteInfo(doctorId: number) {
    const doctor = await this.doctorRepository.getDoctorById(doctorId);
    if (!doctor || !doctor.user_id) {
      return null;
    }

    const user = await this.userRepository.getUserById(doctor.user_id);
    if (!user) {
      return null;
    }

    const { password, ...userWithoutPassword } = user.toJSON();
    const doctorData = doctor.toJSON();

    return {
      ...userWithoutPassword,
      ...doctorData,
    };
  }
}
