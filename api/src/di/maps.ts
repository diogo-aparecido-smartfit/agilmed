import { AppointmentRepository } from "../repositories/appointment.repository";
import { DoctorRepository } from "../repositories/doctor.repository";
import { IAppointmentRepository } from "../repositories/interfaces/appointment.interface";
import { IDoctorRepository } from "../repositories/interfaces/doctor.interface";
import { IMedicalCentersRepository } from "../repositories/interfaces/medical-centers.interface";
import { IPatientRepository } from "../repositories/interfaces/patient.interface";
import { IUserRepository } from "../repositories/interfaces/user.interface";
import { MedicalCentersRepository } from "../repositories/medical-centers.repository";
import { PatientRepository } from "../repositories/patient.repository";
import { UserRepository } from "../repositories/user.repository";
import { AIConfigService } from "../services/ai-config.service";
import { AppointmentService } from "../services/appointment.service";
import { AuthService } from "../services/auth.service";
import { DoctorService } from "../services/doctor.service";
import { LangChainService } from "../services/langchain.service";
import { MedicalCentersService } from "../services/medical-centers.service";
import { PatientService } from "../services/patient.service";
import { SampleDataService } from "../services/sample-data.service";
import { ToolService } from "../services/tool.service";
import { UserService } from "../services/user.service";
import { DI_TOKENS } from "./tokens";

export type ServiceMap = {
  [DI_TOKENS.AUTH_SERVICE]: AuthService;
  [DI_TOKENS.USER_SERVICE]: UserService;
  [DI_TOKENS.PATIENT_SERVICE]: PatientService;
  [DI_TOKENS.DOCTOR_SERVICE]: DoctorService;
  [DI_TOKENS.SAMPLE_DATA_SERVICE]: SampleDataService;
  [DI_TOKENS.APPOINTMENT_SERVICE]: AppointmentService;
  [DI_TOKENS.MEDICAL_CENTERS_SERVICE]: MedicalCentersService;
  [DI_TOKENS.LANGCHAIN_SERVICE]: LangChainService;
  [DI_TOKENS.AI_CONFIG_SERVICE]: AIConfigService;
  [DI_TOKENS.TOOL_SERVICE]: ToolService;
};

export type RepositoryMap = {
  [DI_TOKENS.USER_REPOSITORY]: UserRepository;
  [DI_TOKENS.PATIENT_REPOSITORY]: PatientRepository;
  [DI_TOKENS.DOCTOR_REPOSITORY]: DoctorRepository;
  [DI_TOKENS.APPOINTMENT_REPOSITORY]: AppointmentRepository;
  [DI_TOKENS.MEDICAL_CENTERS_REPOSITORY]: MedicalCentersRepository;
};

export type RepositoryInterfaceMap = {
  [DI_TOKENS.IUSER_REPOSITORY]: IUserRepository;
  [DI_TOKENS.IPATIENT_REPOSITORY]: IPatientRepository;
  [DI_TOKENS.IDOCTOR_REPOSITORY]: IDoctorRepository;
  [DI_TOKENS.IAPPOINTMENT_REPOSITORY]: IAppointmentRepository;
  [DI_TOKENS.IMEDICAL_CENTERS_REPOSITORY]: IMedicalCentersRepository;
};

export type DependencyMap = ServiceMap & RepositoryMap & RepositoryInterfaceMap;

/**
 * Type representing dependency keys in the container
 */
export type DependencyKey = keyof DependencyMap;

/**
 * Type representing dependency values in the container
 */
export type DependencyValue = DependencyMap[DependencyKey];

/**
 * Type for the dependencies map used in the container
 */
export type DependenciesMap = Map<DependencyKey, DependencyValue>;
