import { DoctorRepository } from "../repositories/doctor.repository";

export class DoctorService {
  private doctorRepository: DoctorRepository;

  constructor() {
    this.doctorRepository = new DoctorRepository();
  }

  async createDoctor(data: any) {
    // Separar dados do usuário e dados do médico
    const userData = {
      full_name: data.full_name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      profile_picture_url: data.profile_picture_url,
      role: "doctor",
    };

    const doctorData = {
      specialty: data.specialty,
      crm: data.crm,
      birthdate: data.birthdate,
      cpf: data.cpf,
      address: data.address,
      city: data.city,
      state: data.state,
      gender: data.gender,
      bio: data.bio,
      available_hours: data.available_hours,
    };

    return this.doctorRepository.createDoctor(userData, doctorData);
  }

  async getDoctorById(id: number) {
    return this.doctorRepository.getDoctorById(id);
  }

  async getDoctorByUserId(userId: number) {
    return this.doctorRepository.getDoctorByUserId(userId);
  }

  async updateDoctor(id: number, data: any) {
    // Se dados do usuário forem enviados, tratar separadamente
    if (
      data.full_name ||
      data.email ||
      data.phone ||
      data.profile_picture_url
    ) {
      const doctor = await this.doctorRepository.getDoctorById(id);

      if (doctor && doctor.user) {
        const userData = {
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          profile_picture_url: data.profile_picture_url,
        };

        // Aqui você precisaria de um userRepository
        // await userRepository.updateUser(doctor.user_id, userData);
      }
    }

    // Atualizar dados específicos do médico
    const doctorData = {
      specialty: data.specialty,
      crm: data.crm,
      birthdate: data.birthdate,
      cpf: data.cpf,
      address: data.address,
      city: data.city,
      state: data.state,
      gender: data.gender,
      bio: data.bio,
      available_hours: data.available_hours,
    };

    return this.doctorRepository.updateDoctor(id, doctorData);
  }

  async getAllDoctors(filters?: any) {
    return this.doctorRepository.getAllDoctors(filters);
  }

  async deleteDoctor(id: number) {
    return this.doctorRepository.deleteDoctor(id);
  }
}
