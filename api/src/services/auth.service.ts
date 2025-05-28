import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { UserRepository } from "../repositories/user.repository";
import { resetPasswordTemplate, signUpTemplate } from "../utils/email.template";

export class AuthService {
  private userRepository: UserRepository;
  private jwtSecret: string;

  constructor() {
    this.userRepository = new UserRepository();
    this.jwtSecret = process.env.JWT_SECRET || "your_default_secret";
  }

  public async authenticate(
    identifier: string,
    password: string
  ): Promise<string | null> {
    const user = await this.userRepository.findByEmailOrCpf(identifier);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("isPasswordValid: ", isPasswordValid);
    console.log("password: ", `"${password}"`);
    console.log("user.password: ", user.password);

    if (!isPasswordValid) {
      return null;
    }

    const token = jwt.sign(
      {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
      this.jwtSecret,
      { expiresIn: "1h" }
    );

    return token;
  }

  public generateVerificationToken(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  public async sendVerificationEmail(
    email: string,
    code: string,
    username?: string,
    isResetPassword?: boolean
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const variables = {
      code: code,
      name: username ?? "",
    };

    const subject = isResetPassword
      ? "Redefinição de senha"
      : "Confirmação de cadastro";

    const mailOptions = {
      from: "AgilMed HealthCare",
      to: email,
      subject,
      html: isResetPassword
        ? resetPasswordTemplate(variables)
        : signUpTemplate(variables),
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Erro ao enviar e-mail de verificação:", error);
      throw new Error("Erro ao enviar e-mail de verificação");
    }
  }

  public generateJwtToken(
    userId: number | string,
    full_name: string,
    email: string,
    role: string
  ): string {
    return jwt.sign(
      {
        id: userId,
        full_name: full_name,
        email: email,
        role: role,
      },
      this.jwtSecret,
      { expiresIn: "1h" }
    );
  }

  public verifyJwtToken(token: string): string | object {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }
  }
}
