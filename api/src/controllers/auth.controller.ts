import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { PatientService } from "../services/patient.service";
import { User } from "../models/user.model";
import { DoctorService } from "../services/doctor.service";
import { SampleDataService } from "../services/sample-data.service";

export class AuthController {
  private authService: AuthService;
  private userService: UserService;
  private patientService: PatientService;
  private doctorService: DoctorService;
  private sampleDataService: SampleDataService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
    this.patientService = new PatientService();
    this.doctorService = new DoctorService();
    this.sampleDataService = new SampleDataService();
  }

  public async authenticate(req: Request, res: Response): Promise<void> {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      res.status(400).json({
        message: "Identificador (CPF ou email) e senha são obrigatórios.",
      });
      return;
    }

    try {
      const token = await this.authService.authenticate(identifier, password);
      if (!token) {
        res.status(401).json({ message: "Credenciais inválidas." });
        return;
      }

      let user = await this.userService.getUserByEmailOrCpf(identifier);

      if (!user) {
        res.status(401).json({ message: "Credenciais inválidas." });
        return;
      }

      const completeUserInfo = await this.authService.getUserCompleteInfo(user);

      res.json({ token, user: completeUserInfo });
    } catch (error) {
      console.error("Erro na autenticação:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const {
        full_name,
        email,
        password,
        phone,
        birthdate,
        cpf,
        address,
        city,
        state,
        gender,
        blood_type,
        allergies,
        medical_history,
        role,
        specialty,
        crm,
        bio,
        available_hours,
      } = req.body;

      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        res.status(400).json({ message: "Email já cadastrado." });
        return;
      }

      const existingCpf = await User.findOne({ where: { cpf } });
      if (existingCpf) {
        res.status(400).json({ message: "CPF já cadastrado." });
        return;
      }

      const verificationCode = this.authService.generateVerificationToken();

      const userData = {
        full_name,
        email,
        cpf,
        password,
        phone,
        verificationCode,
        role: role || "patient",
      };

      if (!role || role === "patient") {
        const patientData = {
          birthdate,
          address,
          city,
          state,
          gender,
          blood_type,
          allergies,
          medical_history,
        };

        const { user, patient } = await this.patientService.createPatient({
          ...userData,
          ...patientData,
        });

        this.authService.sendVerificationEmail(
          email,
          verificationCode,
          user.full_name.split(" ")[0]
        );

        // Create sample appointments for the new patient (runs asynchronously)
        this.sampleDataService.createSampleAppointmentsForPatient(patient);

        const token = this.authService.generateJwtToken(
          user.id,
          user.full_name,
          user.email,
          user.role
        );

        const { password: userPassword, ...userWithoutPassword } =
          user.dataValues;

        res.status(201).json({
          token,
          user: {
            ...userWithoutPassword,
            patient,
          },
        });
      } else if (role === "doctor" && this.doctorService) {
        const doctorData = {
          birthdate,
          address,
          city,
          state,
          gender,
          specialty,
          crm,
          bio,
          available_hours,
        };

        const { user, doctor } = await this.doctorService.createDoctor({
          ...userData,
          ...doctorData,
        });

        this.authService.sendVerificationEmail(
          email,
          verificationCode,
          user.full_name.split(" ")[0]
        );

        const token = this.authService.generateJwtToken(
          user.id,
          user.full_name,
          user.email,
          user.role
        );

        const { password: userPassword, ...userWithoutPassword } =
          user.dataValues;

        res.status(201).json({
          token,
          user: {
            ...userWithoutPassword,
            doctor,
          },
        });
      } else {
        const user = await this.userService.createUser(userData);

        this.authService.sendVerificationEmail(
          email,
          verificationCode,
          user.full_name.split(" ")[0]
        );

        const token = this.authService.generateJwtToken(
          user.id,
          user.full_name,
          user.email,
          user.role
        );

        const { password: userPassword, ...userWithoutPassword } =
          user.toJSON();

        res.status(201).json({
          token,
          user: userWithoutPassword,
        });
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      res
        .status(500)
        .json({ error: "Erro ao registrar usuário. Tente novamente." });
    }
  }

  public async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { document, typed_password, password_confirm } = req.body;

      if (typed_password !== password_confirm) {
        res.status(400).json({ message: "As senhas não são iguais!" });
        return;
      }

      const existingUser = await this.userService.getUserByEmailOrCpf(document);

      if (!existingUser) {
        res.status(400).json({ message: "Usuário não encontrado!" });
        return;
      }

      const verificationCode = this.authService.generateVerificationToken();

      existingUser.verificationCode = verificationCode;
      await existingUser.save();

      this.authService.sendVerificationEmail(
        existingUser.email,
        verificationCode,
        existingUser.full_name.split(" ")[0],
        true
      );

      res.status(201).json({
        message: "Código de verificação enviado para o email do usuário!",
        email: existingUser.email,
      });
    } catch (error) {
      console.error("Erro ao resetar senha do usuário:", error);
      res.status(500).json({
        error: "Erro ao resetar senha do usuário. Tente novamente.",
      });
    }
  }

  public async verifyCode(req: Request, res: Response): Promise<void> {
    try {
      const { email, code, typed_password, password_confirm } = req.body;

      const findedUser = await User.findOne({ where: { email } });

      if (!findedUser || findedUser.verificationCode !== code) {
        res.status(400).json({ message: "Código de verificação inválido." });
        return;
      }

      if (typed_password && password_confirm) {
        findedUser.password = password_confirm;
      }

      findedUser.isVerified = true;
      findedUser.verificationCode = null;

      await findedUser.save();

      const token = this.authService.generateJwtToken(
        findedUser.id,
        findedUser.full_name,
        findedUser.email,
        findedUser.role
      );

      const completeUserInfo = await this.authService.getUserCompleteInfo(
        findedUser
      );

      res.status(200).json({
        message: "Verificação bem-sucedida.",
        token,
        user: completeUserInfo,
      });
      return;
    } catch (error) {
      res.status(500).json({ message: "Erro ao verificar código." });
      console.error(error);
      return;
    }
  }
}
