import { Op } from "sequelize";
import { User } from "../models/user.model";
import Doctor from "../models/doctor.model";
import Patient from "../models/patient.model";
import Appointment, {
  AppointmentCreationData,
} from "../models/appointment.model";

export class AppointmentService {
  /**
   * Cria um novo agendamento
   */
  async createAppointment(data: AppointmentCreationData) {
    try {
      console.log("Criando agendamento com dados:", data);

      const patient = await Patient.findByPk(data.patient_id, {
        include: [{ model: User, as: "user" }],
      });

      if (!patient) {
        console.error(`Paciente ID ${data.patient_id} não encontrado`);
        throw new Error("Paciente não encontrado");
      }

      console.log(`Paciente encontrado: ${patient.user?.full_name}`);

      let doctor;

      if (data.doctor_id) {
        doctor = await Doctor.findByPk(data.doctor_id, {
          include: [{ model: User, as: "user" }],
        });
      } else if (data.doctor_name) {
        const doctorUsers = await User.findAll({
          where: {
            role: "doctor",
            full_name: { [Op.like]: `%${data.doctor_name}%` },
          },
          include: [{ model: Doctor, as: "doctor" }],
        });

        if (doctorUsers.length > 0 && doctorUsers[0].id) {
          doctor = await Doctor.findByPk(doctorUsers[0].id, {
            include: [{ model: User, as: "user" }],
          });
        }
      } else {
        throw new Error("É necessário informar o ID ou nome do médico");
      }

      if (!doctor) {
        console.error(
          `Médico não encontrado (ID: ${data.doctor_id}, Nome: ${data.doctor_name})`
        );
        throw new Error("Médico não encontrado");
      }

      console.log(`Médico encontrado: ${doctor.user?.full_name}`);

      const appointmentData = {
        doctor_id: doctor.id,
        patient_id: patient.id,
        appointment_date: data.appointment_date,
        reason: data.reason,
        status: data.status || "pending",
        notes: data.notes,
      };

      console.log("Dados do agendamento a ser criado:", appointmentData);

      // Criar o agendamento
      const appointment = await Appointment.create(appointmentData);
      console.log(`Agendamento criado com ID: ${appointment.id}`);

      // Retornar o agendamento com dados completos
      return this.getAppointmentById(appointment.id);
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      throw error;
    }
  }

  /**
   * Busca um agendamento pelo ID
   */
  async getAppointmentById(id: number) {
    try {
      return Appointment.findByPk(id, {
        include: [
          {
            model: Doctor,
            as: "doctor",
            include: [{ model: User, as: "user" }],
          },
          {
            model: Patient,
            as: "patient",
            include: [{ model: User, as: "user" }],
          },
        ],
      });
    } catch (error) {
      console.error(`Erro ao buscar agendamento ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Busca todos os agendamentos com filtros opcionais
   */
  async getAllAppointments(filters: any = {}) {
    try {
      const where: any = {};

      // Aplicar filtros
      if (filters.doctor_id) {
        where.doctor_id = filters.doctor_id;
      }

      if (filters.patient_id) {
        where.patient_id = filters.patient_id;
      }

      if (filters.status) {
        where.status = filters.status;
      }

      // Filtro por data
      if (filters.date) {
        const date = new Date(filters.date);
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);

        where.appointment_date = {
          [Op.gte]: date,
          [Op.lt]: nextDay,
        };
      }

      // Filtro por período
      if (filters.start_date && filters.end_date) {
        where.appointment_date = {
          [Op.between]: [
            new Date(filters.start_date),
            new Date(filters.end_date),
          ],
        };
      } else if (filters.start_date) {
        where.appointment_date = {
          [Op.gte]: new Date(filters.start_date),
        };
      } else if (filters.end_date) {
        where.appointment_date = {
          [Op.lte]: new Date(filters.end_date),
        };
      }

      return Appointment.findAll({
        where,
        include: [
          {
            model: Doctor,
            as: "doctor",
            include: [{ model: User, as: "user" }],
          },
          {
            model: Patient,
            as: "patient",
            include: [{ model: User, as: "user" }],
          },
        ],
        order: [["appointment_date", "ASC"]],
      });
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      throw error;
    }
  }

  /**
   * Atualiza um agendamento existente
   */
  async updateAppointment(id: number, data: Partial<Appointment>) {
    try {
      const appointment = await Appointment.findByPk(id);

      if (!appointment) {
        return null;
      }

      // Atualizar o agendamento
      await appointment.update(data);

      // Retornar o agendamento atualizado com dados completos
      return this.getAppointmentById(id);
    } catch (error) {
      console.error(`Erro ao atualizar agendamento ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Busca agendamentos para um usuário específico
   */
  async getAppointmentsForUser(userId: number) {
    try {
      // Verificar se o usuário é um paciente
      const patient = await Patient.findOne({
        where: { user_id: userId },
      });

      if (patient) {
        console.log(
          `Usuário ${userId} é um paciente (ID: ${patient.id}). Buscando seus agendamentos...`
        );
        return Appointment.findAll({
          where: { patient_id: patient.id },
          include: [
            {
              model: Doctor,
              as: "doctor",
              include: [{ model: User, as: "user" }],
            },
          ],
          order: [["appointment_date", "ASC"]],
        });
      }

      // Verificar se o usuário é um médico
      const doctor = await Doctor.findOne({
        where: { user_id: userId },
      });

      if (doctor) {
        console.log(
          `Usuário ${userId} é um médico (ID: ${doctor.id}). Buscando seus agendamentos...`
        );
        return Appointment.findAll({
          where: { doctor_id: doctor.id },
          include: [
            {
              model: Patient,
              as: "patient",
              include: [{ model: User, as: "user" }],
            },
          ],
          order: [["appointment_date", "ASC"]],
        });
      }

      console.log(`Usuário ${userId} não é nem paciente nem médico.`);
      return [];
    } catch (error) {
      console.error(
        `Erro ao buscar agendamentos para usuário ${userId}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Deleta um agendamento
   */
  async deleteAppointment(id: number) {
    try {
      return Appointment.destroy({ where: { id } });
    } catch (error) {
      console.error(`Erro ao deletar agendamento ID ${id}:`, error);
      throw error;
    }
  }
}
