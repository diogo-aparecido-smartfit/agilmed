import { AppointmentController } from "../../controllers/appointment.controller";
import { AuthController } from "../../controllers/auth.controller";
import { ChatController } from "../../controllers/chat.controller";
import { DoctorController } from "../../controllers/doctor.controller";
import { MedicalCentersController } from "../../controllers/medical-centers.controller";
import { PatientController } from "../../controllers/patient.controller";
import { UserController } from "../../controllers/user.controller";
import { UserService } from "../../services/user.service";
import { container } from "../container";
import { DI_TOKENS } from "../tokens";

export class ControllerFactory {
  static createAuthController(): AuthController {
    const authService = container.resolve(DI_TOKENS.AUTH_SERVICE);
    const userService = container.resolve(DI_TOKENS.USER_SERVICE);
    const patientService = container.resolve(DI_TOKENS.PATIENT_SERVICE);
    const doctorService = container.resolve(DI_TOKENS.DOCTOR_SERVICE);
    const sampleDataService = container.resolve(DI_TOKENS.SAMPLE_DATA_SERVICE);

    return new AuthController(
      authService,
      userService,
      patientService,
      doctorService,
      sampleDataService
    );
  }

  static createUserController(): UserController {
    const userService = container.resolve(
      DI_TOKENS.USER_SERVICE
    ) as UserService;
    return new UserController(userService);
  }

  static createPatientController(): PatientController {
    const patientService = container.resolve(DI_TOKENS.PATIENT_SERVICE);
    return new PatientController(patientService);
  }

  static createDoctorController(): DoctorController {
    const doctorService = container.resolve(DI_TOKENS.DOCTOR_SERVICE);
    return new DoctorController(doctorService);
  }

  static createAppointmentController(): AppointmentController {
    const appointmentService = container.resolve(DI_TOKENS.APPOINTMENT_SERVICE);
    return new AppointmentController(appointmentService);
  }

  static createMedicalCentersController(): MedicalCentersController {
    const medicalCenterService = container.resolve(
      DI_TOKENS.MEDICAL_CENTERS_SERVICE
    );
    return new MedicalCentersController(medicalCenterService);
  }

  static createChatController(): ChatController {
    const chatService = container.resolve(DI_TOKENS.LANGCHAIN_SERVICE);
    return new ChatController(chatService);
  }
}
