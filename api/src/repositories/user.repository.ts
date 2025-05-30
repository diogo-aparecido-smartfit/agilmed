import { Op } from "sequelize";
import { User, UserCreationAttributes } from "../models/user.model";

export class UserRepository {
  async createUser(data: UserCreationAttributes): Promise<User> {
    return await User.create(data);
  }

  async getUserById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | null> {
    const [affectedCount, affectedRows] = await User.update(data, {
      where: { id },
      returning: true,
    });

    if (affectedCount > 0) {
      return await this.getUserById(id);
    }

    return null;
  }

  async deleteUser(id: number): Promise<boolean> {
    const deleted = await User.destroy({ where: { id } });
    return deleted > 0;
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

    return await User.findAll({ where });
  }

  public async findByEmailOrCpf(identifier: string): Promise<User | null> {
    return User.findOne({
      where: {
        [Op.or]: [{ email: identifier }],
      },
    });
  }
}
