import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { UserRepository } from "../repositories/user.repository";
import { PatientRepository } from "../repositories/patient.repository";
import { DoctorRepository } from "../repositories/doctor.repository";
import { resetPasswordTemplate, signUpTemplate } from "../utils/email.template";
import { User } from "../models/user.model";

export class AuthService {
  private userRepository: UserRepository;
  private patientRepository: PatientRepository;
  private doctorRepository: DoctorRepository;
  private jwtSecret: string;

  constructor() {
    this.userRepository = new UserRepository();
    this.patientRepository = new PatientRepository();
    this.doctorRepository = new DoctorRepository();
    this.jwtSecret = process.env.JWT_SECRET || "your_default_secret";
  }

  public async authenticate(
    identifier: string,
    password: string
  ): Promise<string | null> {
    const user = await this.userRepository.findByEmailOrCpf(identifier);

    if (!user) {
      const patientByCpf = await this.patientRepository.getPatientByCpf(
        identifier
      );
      const doctorByCpf = await this.doctorRepository.getDoctorByCpf(
        identifier
      );

      let userByRole = null;
      if (patientByCpf) {
        userByRole = await this.userRepository.getUserById(
          patientByCpf.user_id
        );
      } else if (doctorByCpf) {
        userByRole = await this.userRepository.getUserById(doctorByCpf.user_id);
      }

      if (!userByRole) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        userByRole.password
      );
      if (!isPasswordValid) {
        return null;
      }

      return this.generateJwtToken(
        userByRole.id,
        userByRole.full_name,
        userByRole.email,
        userByRole.role
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return this.generateJwtToken(
      user.id,
      user.full_name,
      user.email,
      user.role
    );
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

  public async getUserCompleteInfo(user: User) {
    const { password, ...userData } = user.toJSON();

    if (user.role === "patient") {
      const patientData = await this.patientRepository.getPatientByUserId(
        user.id
      );
      if (patientData) {
        return {
          ...userData,
          patient: patientData,
        };
      }
    } else if (user.role === "doctor") {
      const doctorData = await this.doctorRepository.getDoctorByUserId(user.id);
      if (doctorData) {
        return {
          ...userData,
          doctor: doctorData,
        };
      }
    }

    return userData;
  }
}
