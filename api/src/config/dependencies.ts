import { container } from "../utils/container";

import { UserRepository } from "../repositories/user.repository";
import { PatientRepository } from "../repositories/patient.repository";
import { DoctorRepository } from "../repositories/doctor.repository";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { MedicalCentersRepository } from "../repositories/medical-centers.repository";

import { UserService } from "../services/user.service";
import { PatientService } from "../services/patient.service";
import { DoctorService } from "../services/doctor.service";
import { AppointmentService } from "../services/appointment.service";
import { AuthService } from "../services/auth.service";
import { MedicalCentersService } from "../services/medical-centers.service";
import { SampleDataService } from "../services/sample-data.service";
import { LangChainService } from "../services/langchain.service";
import { ToolService } from "../services/tool.service";
import { AIConfigService } from "../services/ai-config.service";

export function setupDependencies(): void {
  const userRepository = new UserRepository();
  const patientRepository = new PatientRepository();
  const doctorRepository = new DoctorRepository();
  const appointmentRepository = new AppointmentRepository();
  const medicalCentersRepository = new MedicalCentersRepository();

  container.register("UserRepository", userRepository);
  container.register("PatientRepository", patientRepository);
  container.register("DoctorRepository", doctorRepository);
  container.register("AppointmentRepository", appointmentRepository);
  container.register("MedicalCentersRepository", medicalCentersRepository);

  container.register("IUserRepository", userRepository);
  container.register("IPatientRepository", patientRepository);
  container.register("IDoctorRepository", doctorRepository);
  container.register("IAppointmentRepository", appointmentRepository);
  container.register("IMedicalCentersRepository", medicalCentersRepository);

  const userService = new UserService(userRepository);
  container.register("UserService", userService);

  const patientService = new PatientService(patientRepository, userRepository);
  container.register("PatientService", patientService);

  const doctorService = new DoctorService(doctorRepository, userRepository);
  container.register("DoctorService", doctorService);

  const appointmentService = new AppointmentService(
    appointmentRepository,
    patientRepository,
    doctorRepository,
    userRepository
  );
  container.register("AppointmentService", appointmentService);

  const authService = new AuthService(
    userRepository,
    patientRepository,
    doctorRepository
  );
  container.register("AuthService", authService);

  const medicalCentersService = new MedicalCentersService(
    medicalCentersRepository
  );
  container.register("MedicalCentersService", medicalCentersService);

  const toolService = new ToolService();
  container.register("ToolService", toolService);

  container.register("AIConfigService", new AIConfigService());

  const langChainService = new LangChainService(toolService);
  container.register("LangChainService", langChainService);

  const sampleDataService = new SampleDataService(
    appointmentService,
    doctorService
  );
  container.register("SampleDataService", sampleDataService);
}
