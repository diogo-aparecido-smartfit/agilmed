import { Op } from "sequelize";
import Patient, { PatientCreationAttributes } from "../models/patient.model";
import User from "../models/user.model";

export class PatientRepository {
  async createPatient(
    userData: any,
    patientData: any
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
    return Patient.findByPk(id, {
      include: [{ model: User, as: "user" }],
    });
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
    const [affectedCount, affectedRows] = await Patient.update(data, {
      where: { id },
      returning: true,
    });

    if (affectedCount > 0) {
      return affectedRows[0];
    }

    return null;
  }

  async getAllPatients(filters?: any): Promise<Patient[]> {
    const where: any = {};

    if (filters?.name) {
      where["$user.full_name$"] = {
        [Op.iLike]: `%${filters.name}%`,
      };
    }

    return Patient.findAll({
      where,
      include: [{ model: User, as: "user" }],
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
      where: { cpf },
      include: [{ model: User, as: "user" }],
    });
  }
}
