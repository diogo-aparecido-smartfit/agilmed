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

    // Verifica se algum usuário foi afetado
    if (affectedCount > 0) {
      return affectedRows[0]; // Retorna o primeiro (e único) usuário atualizado
    }

    return null; // Retorna null caso o usuário não tenha sido encontrado
  }

  async deleteUser(id: number): Promise<void> {
    await User.destroy({ where: { id } });
  }

  async getAllUsers(filters?: any): Promise<User[]> {
    const where: any = {};

    if (filters.name) {
      where.full_name = {
        [Op.iLike]: `%${filters.name}%`,
      };
    }

    if (filters.role) {
      where.role = filters.role;
    }

    return await User.findAll({ where });
  }

  public async findByEmailOrCpf(identifier: string): Promise<User | null> {
    return User.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { cpf: identifier }],
      },
    });
  }
}
