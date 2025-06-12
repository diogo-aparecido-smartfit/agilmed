export const DI_TOKENS = {
  USER_REPOSITORY: "UserRepository",
  PATIENT_REPOSITORY: "PatientRepository",
  DOCTOR_REPOSITORY: "DoctorRepository",
  APPOINTMENT_REPOSITORY: "AppointmentRepository",
  MEDICAL_CENTERS_REPOSITORY: "MedicalCentersRepository",

  IUSER_REPOSITORY: "IUserRepository",
  IPATIENT_REPOSITORY: "IPatientRepository",
  IDOCTOR_REPOSITORY: "IDoctorRepository",
  IAPPOINTMENT_REPOSITORY: "IAppointmentRepository",
  IMEDICAL_CENTERS_REPOSITORY: "IMedicalCentersRepository",

  USER_SERVICE: "UserService",
  PATIENT_SERVICE: "PatientService",
  DOCTOR_SERVICE: "DoctorService",
  APPOINTMENT_SERVICE: "AppointmentService",
  AUTH_SERVICE: "AuthService",
  MEDICAL_CENTERS_SERVICE: "MedicalCentersService",
  TOOL_SERVICE: "ToolService",
  AI_CONFIG_SERVICE: "AIConfigService",
  LANGCHAIN_SERVICE: "LangChainService",
  SAMPLE_DATA_SERVICE: "SampleDataService",
} as const;
