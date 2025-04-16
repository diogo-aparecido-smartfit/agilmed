import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";

export class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
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

      const findedUser = await this.userService.getUserByEmailOrCpf(identifier);

      if (!findedUser) {
        res.status(401).json({ message: "Credenciais inválidas." });
        return;
      }

      const { password: userPassword, ...user } = findedUser.dataValues;

      res.json({ token, user });
    } catch (error) {
      console.error("Erro na autenticação:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const {
        full_name,
        birthdate,
        cpf,
        email,
        password,
        address,
        city,
        state,
        phone,
        gender,
        allergies,
        blood_type,
        medical_history,
        role,
      } = req.body;

      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        res.status(400).json({ message: "Email já cadastrado." });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = this.authService.generateVerificationToken();

      const user = await this.userService.createUser({
        full_name,
        birthdate,
        cpf,
        email,
        password: hashedPassword,
        address,
        city,
        state,
        phone,
        gender,
        verificationCode,
        allergies,
        blood_type,
        medical_history,
        role: role || "patient",
      });

      await this.authService.sendVerificationEmail(
        email,
        verificationCode,
        user.full_name.split(" ")[0]
      );

      res.status(201).json({
        message:
          "Usuário criado com sucesso. Verifique seu e-mail para confirmar a conta.",
      });
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

      const existingUser = await this.userService.getUserByEmailOrCpf(document);

      if (!existingUser) {
        res.status(400).json({ message: "Usuário não encontrado!" });
        return;
      }

      if (typed_password !== password_confirm) {
        res.status(400).json({ message: "As senhas não são iguais!" });
        return;
      }

      const verificationCode = this.authService.generateVerificationToken();

      existingUser.verificationCode = verificationCode;
      existingUser.save();

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
        error: "Erro ao resetar senha do usuário usuário. Tente novamente.",
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

      if (!typed_password && !password_confirm) {
        const response = await this.authService.createChatbotProfile({
          id: findedUser.id.toString(),
          name: findedUser.full_name,
        });

        findedUser.chatbot_user_id = response.key;
      }

      await findedUser.save();

      const token = this.authService.generateJwtToken(findedUser.id);

      const { password, ...user } = findedUser.dataValues;

      res
        .status(200)
        .json({ message: "Verificação bem-sucedida.", token, user });
      return;
    } catch (error) {
      res.status(500).json({ message: "Erro ao verificar código." });
      console.error(error);
      return;
    }
  }
}
