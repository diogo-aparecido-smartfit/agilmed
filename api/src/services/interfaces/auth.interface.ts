import { User } from "../../models/user.model";

export interface IAuthService {
  authenticate(identifier: string, password: string): Promise<string | null>;
  generateVerificationToken(): string;
  sendVerificationEmail(
    email: string,
    code: string,
    username?: string,
    isResetPassword?: boolean
  ): Promise<void>;
  generateJwtToken(
    userId: number | string,
    full_name: string,
    email: string,
    role: string
  ): string;
  verifyJwtToken(token: string): string | object;
  getUserCompleteInfo(user: User): Promise<any>;
}
