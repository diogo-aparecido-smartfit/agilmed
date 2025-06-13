import { container } from "./container";
import { DI_TOKENS } from "./tokens";

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
  setupRepositories();
  setupDomainServices();
}

function setupRepositories(): void {
  const userRepository = new UserRepository();
  const patientRepository = new PatientRepository();
  const doctorRepository = new DoctorRepository();
  const appointmentRepository = new AppointmentRepository();
  const medicalCentersRepository = new MedicalCentersRepository();

  container.register(DI_TOKENS.IUSER_REPOSITORY, userRepository);
  container.register(DI_TOKENS.IPATIENT_REPOSITORY, patientRepository);
  container.register(DI_TOKENS.IDOCTOR_REPOSITORY, doctorRepository);
  container.register(DI_TOKENS.IAPPOINTMENT_REPOSITORY, appointmentRepository);
  container.register(
    DI_TOKENS.IMEDICAL_CENTERS_REPOSITORY,
    medicalCentersRepository
  );
}

function setupDomainServices(): void {
  const userRepository = container.resolve(DI_TOKENS.IUSER_REPOSITORY);
  const patientRepository = container.resolve(DI_TOKENS.IPATIENT_REPOSITORY);
  const doctorRepository = container.resolve(DI_TOKENS.IDOCTOR_REPOSITORY);
  const appointmentRepository = container.resolve(
    DI_TOKENS.IAPPOINTMENT_REPOSITORY
  );
  const medicalCentersRepository = container.resolve(
    DI_TOKENS.IMEDICAL_CENTERS_REPOSITORY
  );

  const userService = new UserService(userRepository);
  container.register(DI_TOKENS.IUSER_SERVICE, userService);

  const patientService = new PatientService(patientRepository, userRepository);
  container.register(DI_TOKENS.IPATIENT_SERVICE, patientService);

  const doctorService = new DoctorService(doctorRepository, userRepository);
  container.register(DI_TOKENS.IDOCTOR_SERVICE, doctorService);

  const medicalCentersService = new MedicalCentersService(
    medicalCentersRepository
  );
  container.register(DI_TOKENS.IMEDICAL_CENTERS_SERVICE, medicalCentersService);

  const appointmentService = new AppointmentService(
    appointmentRepository,
    patientRepository,
    doctorRepository,
    userRepository
  );
  container.register(DI_TOKENS.IAPPOINTMENT_SERVICE, appointmentService);

  const authService = new AuthService(
    userRepository,
    patientRepository,
    doctorRepository
  );
  container.register(DI_TOKENS.IAUTH_SERVICE, authService);

  const toolService = new ToolService(
    doctorService,
    medicalCentersService,
    appointmentService
  );
  container.register(DI_TOKENS.ITOOL_SERVICE, toolService);

  const aiConfigService = new AIConfigService();
  container.register(DI_TOKENS.IAI_CONFIG_SERVICE, aiConfigService);

  const langChainService = new LangChainService(toolService, aiConfigService);
  container.register(DI_TOKENS.ILANGCHAIN_SERVICE, langChainService);

  const sampleDataService = new SampleDataService(
    appointmentService,
    doctorService
  );
  container.register(DI_TOKENS.ISAMPLE_DATA_SERVICE, sampleDataService);
}
