import { UserRepository } from "../repositories/user.repository";

export class DoctorService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllDoctors(filters: any = {}) {
    const doctorFilters = {
      ...filters,
      role: "doctor",
    };

    const doctors = await this.userRepository.getAllUsers(doctorFilters);

    return doctors.map((doctor) => ({
      id: doctor.id,
      name: doctor.full_name,
      specialty: "Clínico Geral",
      city: doctor.city,
      state: doctor.state,
    }));
  }
}
