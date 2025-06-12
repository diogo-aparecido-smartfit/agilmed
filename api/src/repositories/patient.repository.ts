import { Op } from "sequelize";
import {
  Patient,
  PatientAttributes,
  PatientCreationAttributes,
  PatientFilters,
} from "../models/patient.model";
import { User, UserCreationAttributes } from "../models/user.model";
import { BaseRepository } from "./base.repository";
import { IPatientRepository } from "./interfaces/patient.interface";

export class PatientRepository
  extends BaseRepository<Patient>
  implements IPatientRepository
{
  constructor() {
    super(Patient);
  }

  async createPatient(
    userData: UserCreationAttributes,
    patientData: PatientCreationAttributes
  ): Promise<{ user: User; patient: Patient }> {
    const transaction = await User.sequelize!.transaction();

    try {
      const user = await User.create(
        {
          ...userData,
          role: "patient",
        },
        { transaction }
      );

      const patient = await Patient.create(
        {
          ...patientData,
          user_id: user.id,
        },
        { transaction }
      );

      await transaction.commit();
      return { user, patient };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getPatientById(id: number): Promise<Patient | null> {
    return this.findById(id);
  }

  async getPatientByUserId(userId: number): Promise<Patient | null> {
    return Patient.findOne({
      where: { user_id: userId },
      include: [{ model: User, as: "user" }],
    });
  }

  async updatePatient(
    id: number,
    data: Partial<Patient>
  ): Promise<Patient | null> {
    return this.update(id, data);
  }

  async getAllPatients(filters?: PatientFilters): Promise<Patient[]> {
    const where: any = {};
    const userWhere: any = {};

    if (filters?.name) {
      userWhere.full_name = {
        [Op.like]: `%${filters.name}%`,
      };
    }

    if (filters?.cpf) {
      userWhere.cpf = filters.cpf;
    }

    const includeOptions: any = {
      model: User,
      as: "user",
    };

    if (Object.keys(userWhere).length > 0) {
      includeOptions.where = userWhere;
    }

    return Patient.findAll({
      where,
      include: [includeOptions],
      nest: true,
      raw: false,
    });
  }

  async deletePatient(id: number): Promise<void> {
    const patient = await Patient.findByPk(id);

    if (patient) {
      const transaction = await User.sequelize!.transaction();

      try {
        await Patient.destroy({
          where: { id },
          transaction,
        });

        await User.destroy({
          where: { id: patient.user_id },
          transaction,
        });

        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    }
  }

  async getPatientByCpf(cpf: string): Promise<Patient | null> {
    return Patient.findOne({
      include: [{ model: User, as: "user", where: { cpf } }],
    });
  }
}
