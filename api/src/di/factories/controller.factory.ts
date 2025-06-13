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
    const authService = container.resolve(DI_TOKENS.IAUTH_SERVICE);
    const userService = container.resolve(DI_TOKENS.IUSER_SERVICE);
    const patientService = container.resolve(DI_TOKENS.IPATIENT_SERVICE);
    const doctorService = container.resolve(DI_TOKENS.IDOCTOR_SERVICE);
    const sampleDataService = container.resolve(DI_TOKENS.ISAMPLE_DATA_SERVICE);

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
      DI_TOKENS.IUSER_SERVICE
    ) as UserService;
    return new UserController(userService);
  }

  static createPatientController(): PatientController {
    const patientService = container.resolve(DI_TOKENS.IPATIENT_SERVICE);
    return new PatientController(patientService);
  }

  static createDoctorController(): DoctorController {
    const doctorService = container.resolve(DI_TOKENS.IDOCTOR_SERVICE);
    return new DoctorController(doctorService);
  }

  static createAppointmentController(): AppointmentController {
    const appointmentService = container.resolve(
      DI_TOKENS.IAPPOINTMENT_SERVICE
    );
    return new AppointmentController(appointmentService);
  }

  static createMedicalCentersController(): MedicalCentersController {
    const medicalCenterService = container.resolve(
      DI_TOKENS.IMEDICAL_CENTERS_SERVICE
    );
    return new MedicalCentersController(medicalCenterService);
  }

  static createChatController(): ChatController {
    const chatService = container.resolve(DI_TOKENS.ILANGCHAIN_SERVICE);
    return new ChatController(chatService);
  }
}
