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
import { IAppointmentService } from "../services/interfaces/appointment.interface";
import { IAuthService } from "../services/interfaces/auth.interface";
import { IDoctorService } from "../services/interfaces/doctor.interface";
import { ILangChainService } from "../services/interfaces/langchain.interface";
import { IMedicalCentersService } from "../services/interfaces/medical-centers.interface";
import { IPatientService } from "../services/interfaces/patient.interface";
import { ISampleDataService } from "../services/interfaces/sample-data.interface";
import { IToolService } from "../services/interfaces/tool.interface";
import { IUserService } from "../services/interfaces/user.interface";
import { IAIConfigService } from "../services/interfaces/ai-config.interface";
import { LangChainService } from "../services/langchain.service";
import { MedicalCentersService } from "../services/medical-centers.service";
import { PatientService } from "../services/patient.service";
import { SampleDataService } from "../services/sample-data.service";
import { ToolService } from "../services/tool.service";
import { UserService } from "../services/user.service";
import { DI_TOKENS } from "./tokens";

export type ServiceMap = {
  [DI_TOKENS.IAUTH_SERVICE]: AuthService;
  [DI_TOKENS.IUSER_SERVICE]: UserService;
  [DI_TOKENS.IPATIENT_SERVICE]: PatientService;
  [DI_TOKENS.IDOCTOR_SERVICE]: DoctorService;
  [DI_TOKENS.ISAMPLE_DATA_SERVICE]: SampleDataService;
  [DI_TOKENS.IAPPOINTMENT_SERVICE]: AppointmentService;
  [DI_TOKENS.IMEDICAL_CENTERS_SERVICE]: MedicalCentersService;
  [DI_TOKENS.ILANGCHAIN_SERVICE]: LangChainService;
  [DI_TOKENS.IAI_CONFIG_SERVICE]: AIConfigService;
  [DI_TOKENS.ITOOL_SERVICE]: ToolService;
};

export type RepositoryMap = {
  [DI_TOKENS.IUSER_REPOSITORY]: UserRepository;
  [DI_TOKENS.IPATIENT_REPOSITORY]: PatientRepository;
  [DI_TOKENS.IDOCTOR_REPOSITORY]: DoctorRepository;
  [DI_TOKENS.IAPPOINTMENT_REPOSITORY]: AppointmentRepository;
  [DI_TOKENS.IMEDICAL_CENTERS_REPOSITORY]: MedicalCentersRepository;
};

export type ServiceInterfaceMap = {
  [DI_TOKENS.IAUTH_SERVICE]: IAuthService;
  [DI_TOKENS.IUSER_SERVICE]: IUserService;
  [DI_TOKENS.IPATIENT_SERVICE]: IPatientService;
  [DI_TOKENS.IDOCTOR_SERVICE]: IDoctorService;
  [DI_TOKENS.ISAMPLE_DATA_SERVICE]: ISampleDataService;
  [DI_TOKENS.IAPPOINTMENT_SERVICE]: IAppointmentService;
  [DI_TOKENS.IMEDICAL_CENTERS_SERVICE]: IMedicalCentersService;
  [DI_TOKENS.ILANGCHAIN_SERVICE]: ILangChainService;
  [DI_TOKENS.IAI_CONFIG_SERVICE]: IAIConfigService;
  [DI_TOKENS.ITOOL_SERVICE]: IToolService;
};

export type RepositoryInterfaceMap = {
  [DI_TOKENS.IUSER_REPOSITORY]: IUserRepository;
  [DI_TOKENS.IPATIENT_REPOSITORY]: IPatientRepository;
  [DI_TOKENS.IDOCTOR_REPOSITORY]: IDoctorRepository;
  [DI_TOKENS.IAPPOINTMENT_REPOSITORY]: IAppointmentRepository;
  [DI_TOKENS.IMEDICAL_CENTERS_REPOSITORY]: IMedicalCentersRepository;
};

export type DependencyMap = ServiceMap &
  RepositoryMap &
  ServiceInterfaceMap &
  RepositoryInterfaceMap;

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
