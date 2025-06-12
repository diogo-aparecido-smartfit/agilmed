import { UserRepository } from "../repositories/user.repository";
import {
  User,
  UserAttributes,
  UserCreationAttributes,
} from "../models/user.model";
import bcrypt from "bcryptjs";
import { IUserRepository } from "../repositories/interfaces/user.interface";

export class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data: UserCreationAttributes): Promise<User> {
    try {
      if (data.password) {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
      }

      return this.userRepository.createUser(data);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      return this.userRepository.getUserById(id);
    } catch (error) {
      console.error(`Erro ao buscar usuário ID ${id}:`, error);
      throw error;
    }
  }

  async updateUser(
    id: number,
    data: Partial<UserAttributes>
  ): Promise<User | null> {
    try {
      if (data.password) {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
      }

      return this.userRepository.updateUser(id, data);
    } catch (error) {
      console.error(`Erro ao atualizar usuário ID ${id}:`, error);
      throw error;
    }
  }

  async getAllUsers(filters?: any): Promise<User[]> {
    try {
      return this.userRepository.getAllUsers(filters);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error;
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      return this.userRepository.deleteUser(id);
    } catch (error) {
      console.error(`Erro ao excluir usuário ID ${id}:`, error);
      throw error;
    }
  }

  async getUserByEmailOrCpf(identifier: string): Promise<User | null> {
    try {
      return this.userRepository.findByEmailOrCpf(identifier);
    } catch (error) {
      console.error(
        `Erro ao buscar usuário por email/cpf ${identifier}:`,
        error
      );
      throw error;
    }
  }
}
