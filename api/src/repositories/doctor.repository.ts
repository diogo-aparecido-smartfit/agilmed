import { Op } from "sequelize";
import Doctor, { DoctorCreationAttributes } from "../models/doctor.model";
import User from "../models/user.model";

export class DoctorRepository {
  async createDoctor(
    userData: any,
    doctorData: any
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
    return Doctor.findByPk(id, {
      include: [{ model: User, as: "user" }],
    });
  }

  async getDoctorByUserId(userId: number): Promise<Doctor | null> {
    return Doctor.findOne({
      where: { user_id: userId },
      include: [{ model: User, as: "user" }],
    });
  }

  async updateDoctor(
    id: number,
    data: Partial<Doctor>
  ): Promise<Doctor | null> {
    const [affectedCount, affectedRows] = await Doctor.update(data, {
      where: { id },
      returning: true,
    });

    if (affectedCount > 0) {
      return affectedRows[0];
    }

    return null;
  }

  async getAllDoctors(filters?: any): Promise<Doctor[]> {
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

      console.log("Buscando médicos com filtros:", { where, userWhere });

      const doctors = await Doctor.findAll({
        where,
        include: [includeOptions],
        nest: true,
      });

      console.log(`Encontrados ${doctors.length} médicos`);
      return doctors;
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
}
