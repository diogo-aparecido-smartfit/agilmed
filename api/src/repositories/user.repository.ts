import { Op } from "sequelize";
import {
  User,
  UserAttributes,
  UserCreationAttributes,
} from "../models/user.model";
import { BaseRepository } from "./base.repository";
import { IUserRepository } from "./interfaces/user.interface";

export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor() {
    super(User);
  }

  async createUser(data: UserCreationAttributes): Promise<User> {
    return this.create(data);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.findById(id);
  }

  async updateUser(
    id: number,
    data: Partial<UserAttributes>
  ): Promise<User | null> {
    return this.update(id, data);
  }

  async deleteUser(id: number): Promise<boolean> {
    await this.delete(id);
    return true;
  }

  async getAllUsers(filters?: any): Promise<User[]> {
    const where: any = {};

    if (filters?.name) {
      where.full_name = {
        [Op.iLike]: `%${filters.name}%`,
      };
    }

    if (filters?.role) {
      where.role = filters.role;
    }

    if (filters?.email) {
      where.email = {
        [Op.iLike]: `%${filters.email}%`,
      };
    }

    return this.findAll(where);
  }

  async findByEmailOrCpf(identifier: string): Promise<User | null> {
    return User.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { cpf: identifier }],
      },
    });
  }
}
