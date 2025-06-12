import { Model, ModelStatic } from "sequelize";
import { IRepository } from "./interfaces/repository.interface";

export abstract class BaseRepository<T extends Model>
  implements IRepository<T>
{
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async create(data: any): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: number): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async findAll(filters?: any): Promise<T[]> {
    return this.model.findAll(filters ? { where: filters } : {});
  }

  async update(id: number, data: Partial<T>): Promise<T | null> {
    const [affectedCount] = await this.model.update(data, {
      where: { id: id as any },
    });

    if (affectedCount > 0) {
      return await this.findById(id);
    }

    return null;
  }

  async delete(id: number): Promise<void> {
    await this.model.destroy({ where: { id: id as any } });
  }
}
