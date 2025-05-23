import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { UserRepository } from "../repositories/user.repository";
import { resetPasswordTemplate, signUpTemplate } from "../utils/email.template";
import { ICreateUserPayload, ICreateUserResponse } from "../types/chat.types";

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
    console.log("password: ", password);
    console.log("user.password: ", user.password);

    if (!isPasswordValid) {
      return null;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, this.jwtSecret, {
      expiresIn: "1h",
    });

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

  public generateJwtToken(userId: number | string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  }

  public verifyJwtToken(token: string): string | object {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }
  }

  public async createChatbotProfile({
    id,
    name,
  }: ICreateUserPayload): Promise<ICreateUserResponse> {
    try {
      const { data } = await axios.post(
        `${process.env.CHATBOT_URL as string}/users`,
        {
          id,
          name,
        }
      );

      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Não foi possível criar o perfil no Botpress.");
    }
  }
}
