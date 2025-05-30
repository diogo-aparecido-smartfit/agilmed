import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { PatientService } from "../services/patient.service";
import { User } from "../models/user.model";

export class AuthController {
  private authService: AuthService;
  private userService: UserService;
  private patientService: PatientService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
    this.patientService = new PatientService();
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

      // Buscar usuário pelo email
      let findedUser = await this.userService.getUserByEmailOrCpf(identifier);

      // Se não encontrou pelo email, tenta buscar por CPF
      if (!findedUser) {
        // Neste ponto sabemos que a autenticação funcionou,
        // então o usuário deve existir, mas podemos ter buscado por CPF
        const decoded = this.authService.verifyJwtToken(token) as any;
        findedUser = await this.userService.getUserById(decoded.id);
      }

      if (!findedUser) {
        res.status(401).json({ message: "Credenciais inválidas." });
        return;
      }

      // Obter informações completas do usuário (incluindo dados especializados)
      const completeUserInfo = await this.authService.getUserCompleteInfo(
        findedUser
      );

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
      } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: "Email já cadastrado." });
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

        await this.authService.sendVerificationEmail(
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
            patient,
          },
        });
      } else {
        // Para outros tipos de usuários (como admin) que não têm tabelas específicas
        // ou para quando implementar o registro de médicos
        const user = await this.userService.createUser(userData);

        // Enviar e-mail de verificação
        await this.authService.sendVerificationEmail(
          email,
          verificationCode,
          user.full_name.split(" ")[0]
        );

        // Gerar token
        const token = this.authService.generateJwtToken(
          user.id,
          user.full_name,
          user.email,
          user.role
        );

        // Remover senha
        const { password: userPassword, ...userWithoutPassword } =
          user.toJSON();

        // Retornar resposta
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

      // Buscar usuário pelo email
      let existingUser = await this.userService.getUserByEmailOrCpf(document);

      // Se não encontrou, buscar por CPF nas tabelas especializadas
      if (!existingUser) {
        // Buscar paciente pelo CPF
        const patientByCpf = await this.patientService.getPatientByCpf(
          document
        );
        if (patientByCpf && patientByCpf.user) {
          existingUser = patientByCpf.user;
        }

        // Ou verificar se for implementado, buscar médico pelo CPF
        // const doctorByCpf = await this.doctorService.getDoctorByCpf(document);
        // if (doctorByCpf && doctorByCpf.user) {
        //   existingUser = doctorByCpf.user;
        // }
      }

      if (!existingUser) {
        res.status(400).json({ message: "Usuário não encontrado!" });
        return;
      }

      const verificationCode = this.authService.generateVerificationToken();

      existingUser.verificationCode = verificationCode;
      await existingUser.save();

      await this.authService.sendVerificationEmail(
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

      // Obter informações completas do usuário
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
