export const DI_TOKENS = {
  IUSER_REPOSITORY: "IUserRepository",
  IPATIENT_REPOSITORY: "IPatientRepository",
  IDOCTOR_REPOSITORY: "IDoctorRepository",
  IAPPOINTMENT_REPOSITORY: "IAppointmentRepository",
  IMEDICAL_CENTERS_REPOSITORY: "IMedicalCentersRepository",

  IUSER_SERVICE: "UserService",
  IPATIENT_SERVICE: "PatientService",
  IDOCTOR_SERVICE: "DoctorService",
  IAPPOINTMENT_SERVICE: "AppointmentService",
  IAUTH_SERVICE: "AuthService",
  IMEDICAL_CENTERS_SERVICE: "MedicalCentersService",
  ITOOL_SERVICE: "ToolService",
  IAI_CONFIG_SERVICE: "AIConfigService",
  ILANGCHAIN_SERVICE: "LangChainService",
  ISAMPLE_DATA_SERVICE: "SampleDataService",
} as const;
