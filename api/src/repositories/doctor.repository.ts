import { Op } from "sequelize";
import {
  Doctor,
  DoctorAttributes,
  DoctorCreationAttributes,
  DoctorFilters,
} from "../models/doctor.model";
import { User, UserCreationAttributes } from "../models/user.model";
import { BaseRepository } from "./base.repository";
import { IDoctorRepository } from "./interfaces/doctor.interface";

export class DoctorRepository
  extends BaseRepository<Doctor>
  implements IDoctorRepository
{
  constructor() {
    super(Doctor);
  }

  async createDoctor(
    userData: UserCreationAttributes,
    doctorData: DoctorCreationAttributes
  ): Promise<{ user: User; doctor: Doctor }> {
    const transaction = await User.sequelize!.transaction();

    try {
      const user = await User.create(
        {
          ...userData,
          role: "doctor",
        },
        { transaction }
      );

      const doctor = await Doctor.create(
        {
          ...doctorData,
          user_id: user.id,
        },
        { transaction }
      );

      await transaction.commit();
      return { user, doctor };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getDoctorById(id: number): Promise<Doctor | null> {
    return this.findById(id);
  }

  async getDoctorByUserId(userId: number): Promise<Doctor | null> {
    return Doctor.findOne({
      where: { user_id: userId },
      include: [{ model: User, as: "user" }],
    });
  }

  async updateDoctor(
    id: number,
    data: Partial<DoctorAttributes>
  ): Promise<Doctor | null> {
    return this.update(id, data);
  }

  async getAllDoctors(filters?: DoctorFilters): Promise<Doctor[]> {
    try {
      const where: any = {};
      const userWhere: any = {};

      if (filters?.specialty) {
        where.specialty = {
          [Op.like]: `%${filters.specialty}%`,
        };
      }

      if (filters?.name) {
        userWhere.full_name = {
          [Op.like]: `%${filters.name}%`,
        };
      }

      const includeOptions: any = {
        model: User,
        as: "user",
      };

      if (Object.keys(userWhere).length > 0) {
        includeOptions.where = userWhere;
      }

      return await Doctor.findAll({
        where,
        include: [includeOptions],
        nest: true,
      });
    } catch (error) {
      console.error("Erro ao buscar médicos:", error);
      throw error;
    }
  }

  async deleteDoctor(id: number): Promise<void> {
    const doctor = await Doctor.findByPk(id);

    if (doctor) {
      const transaction = await User.sequelize!.transaction();

      try {
        await Doctor.destroy({
          where: { id },
          transaction,
        });

        await User.destroy({
          where: { id: doctor.user_id },
          transaction,
        });

        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    }
  }

  async getDoctorByCpf(cpf: string): Promise<Doctor | null> {
    return Doctor.findOne({
      include: [{ model: User, as: "user", where: { cpf } }],
    });
  }

  async getDoctorByCRM(crm: string): Promise<Doctor | null> {
    return Doctor.findOne({
      where: { crm },
      include: [{ model: User, as: "user" }],
    });
  }
}
