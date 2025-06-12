import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";
import { PatientController } from "../controllers/patient.controller";
import { DoctorController } from "../controllers/doctor.controller";
import { AppointmentController } from "../controllers/appointment.controller";
import { MedicalCentersController } from "../controllers/medical-centers.controller";
import { ChatController } from "../controllers/chat.controller";

export class ControllerFactory {
  static createAuthController(): AuthController {
    return new AuthController();
  }

  static createUserController(): UserController {
    return new UserController();
  }

  static createPatientController(): PatientController {
    return new PatientController();
  }

  static createDoctorController(): DoctorController {
    return new DoctorController();
  }

  static createAppointmentController(): AppointmentController {
    return new AppointmentController();
  }

  static createMedicalCentersController(): MedicalCentersController {
    return new MedicalCentersController();
  }

  static createChatController(): ChatController {
    return new ChatController();
  }
}
