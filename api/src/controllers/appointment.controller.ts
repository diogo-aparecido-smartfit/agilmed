import { Response } from "express";
import { AppointmentService } from "../services/appointment.service";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  async createAppointment(req: AuthenticatedRequest, res: Response) {
    try {
      const { doctor_id, patient_id, appointment_date, reason, notes, status } =
        req.body;

      if (!doctor_id || !patient_id || !appointment_date || !reason) {
        res.status(400).json({
          message:
            "Dados incompletos. Informe doctor_id, patient_id, appointment_date e reason.",
        });
        return;
      }

      const appointmentDate = new Date(appointment_date);
      const currentDate = new Date();

      if (appointmentDate < currentDate) {
        res.status(400).json({
          message: "A data do agendamento não pode ser no passado.",
        });
        return;
      }

      const appointment = await this.appointmentService.createAppointment({
        doctor_id,
        patient_id,
        appointment_date: appointmentDate,
        reason,
        notes,
        status: status || "pending",
      });

      const sanitizedAppointment = this.sanitizeAppointmentData(appointment);

      res.status(201).json(sanitizedAppointment);
    } catch (err: any) {
      console.error("Erro ao criar agendamento:", err);

      if (
        err.message === "Paciente não encontrado" ||
        err.message === "Médico não encontrado"
      ) {
        res.status(400).json({ message: err.message });
        return;
      }

      res.status(500).json({
        message: "Erro ao criar agendamento",
        error:
          process.env.NODE_ENV === "production"
            ? "Erro interno do servidor"
            : err.message,
      });
    }
  }

  async getAllAppointments(req: AuthenticatedRequest, res: Response) {
    try {
      if (req.user?.role !== "admin") {
        res.status(403).json({
          message:
            "Acesso negado. Apenas administradores podem listar todos os agendamentos.",
        });
        return;
      }

      const filters = this.validateFilters(req.query);

      const appointments = await this.appointmentService.getAllAppointments(
        filters
      );

      const sanitizedAppointments = appointments.map((appointment) =>
        this.sanitizeAppointmentData(appointment)
      );

      res.json(sanitizedAppointments);
    } catch (err: any) {
      console.error("Erro ao buscar agendamentos:", err);
      res.status(500).json({
        message: "Erro ao buscar agendamentos",
        error:
          process.env.NODE_ENV === "production"
            ? "Erro interno do servidor"
            : err.message,
      });
    }
  }

  async getAppointmentById(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        res.status(400).json({
          message: "ID do agendamento inválido",
        });
        return;
      }

      const appointment = await this.appointmentService.getAppointmentById(
        Number(id)
      );

      if (!appointment) {
        res.status(404).json({
          message: "Agendamento não encontrado",
        });
        return;
      }

      const userId = req.user?.id;
      const userIsDoctor = appointment.doctor?.user_id === userId;
      const userIsPatient = appointment.patient?.user_id === userId;
      const userIsAdmin = req.user?.role === "admin";

      if (!userIsDoctor && !userIsPatient && !userIsAdmin) {
        res.status(403).json({
          message:
            "Acesso negado. Você não tem permissão para ver este agendamento.",
        });
        return;
      }

      const sanitizedAppointment = this.sanitizeAppointmentData(appointment);

      res.json(sanitizedAppointment);
    } catch (err: any) {
      console.error(`Erro ao buscar agendamento ID ${req.params.id}:`, err);
      res.status(500).json({
        message: "Erro ao buscar agendamento",
        error:
          process.env.NODE_ENV === "production"
            ? "Erro interno do servidor"
            : err.message,
      });
    }
  }

  async updateAppointment(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        res.status(400).json({
          message: "ID do agendamento inválido",
        });
        return;
      }

      const existingAppointment =
        await this.appointmentService.getAppointmentById(Number(id));

      if (!existingAppointment) {
        res.status(404).json({
          message: "Agendamento não encontrado",
        });
        return;
      }

      const userId = req.user?.id;
      const userIsDoctor = existingAppointment.doctor?.user_id === userId;
      const userIsPatient = existingAppointment.patient?.user_id === userId;
      const userIsAdmin = req.user?.role === "admin";

      if (!userIsDoctor && !userIsPatient && !userIsAdmin) {
        res.status(403).json({
          message:
            "Acesso negado. Você não tem permissão para atualizar este agendamento.",
        });
        return;
      }

      const { appointment_date, status, notes, reason } = req.body;
      const updateData: any = {};

      if (userIsPatient && !userIsAdmin) {
        if (notes !== undefined) updateData.notes = notes;

        if (Object.keys(req.body).some((key) => key !== "notes")) {
          res.status(403).json({
            message:
              "Como paciente, você só pode atualizar as notas do agendamento.",
          });
          return;
        }
      } else {
        if (appointment_date !== undefined) {
          const appointmentDate = new Date(appointment_date);
          const currentDate = new Date();

          if (appointmentDate < currentDate) {
            res.status(400).json({
              message: "A nova data do agendamento não pode ser no passado.",
            });
            return;
          }

          updateData.appointment_date = appointmentDate;
        }

        if (status !== undefined) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;
        if (reason !== undefined) updateData.reason = reason;
      }

      const updated = await this.appointmentService.updateAppointment(
        Number(id),
        updateData
      );

      const sanitizedAppointment = this.sanitizeAppointmentData(updated);

      res.json(sanitizedAppointment);
    } catch (err: any) {
      console.error(`Erro ao atualizar agendamento ID ${req.params.id}:`, err);
      res.status(500).json({
        message: "Erro ao atualizar agendamento",
        error:
          process.env.NODE_ENV === "production"
            ? "Erro interno do servidor"
            : err.message,
      });
    }
  }

  async getMyAppointments(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req?.user?.id;

      if (!userId || isNaN(Number(userId))) {
        res.status(401).json({
          message: "Não autenticado",
        });
        return;
      }

      const filters = this.validateFilters(req.query);

      const appointments = await this.appointmentService.getAppointmentsForUser(
        userId
      );

      const sanitizedAppointments = appointments.map((appointment) =>
        this.sanitizeAppointmentData(appointment)
      );

      res.json(sanitizedAppointments);
    } catch (err: any) {
      console.error(
        `Erro ao buscar agendamentos do usuário ${req.user?.id}:`,
        err
      );
      res.status(500).json({
        message: "Erro ao buscar agendamentos",
        error:
          process.env.NODE_ENV === "production"
            ? "Erro interno do servidor"
            : err.message,
      });
    }
  }

  async deleteAppointment(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        res.status(400).json({
          message: "ID do agendamento inválido",
        });
        return;
      }

      const existingAppointment =
        await this.appointmentService.getAppointmentById(Number(id));

      if (!existingAppointment) {
        res.status(404).json({
          message: "Agendamento não encontrado",
        });
        return;
      }

      const userId = req.user?.id;
      const userIsDoctor = existingAppointment.doctor?.user_id === userId;
      const userIsAdmin = req.user?.role === "admin";

      if (!userIsDoctor && !userIsAdmin) {
        res.status(403).json({
          message:
            "Acesso negado. Apenas médicos ou administradores podem excluir agendamentos.",
        });
        return;
      }

      await this.appointmentService.deleteAppointment(Number(id));

      res.status(204).send();
    } catch (err: any) {
      console.error(`Erro ao excluir agendamento ID ${req.params.id}:`, err);
      res.status(500).json({
        message: "Erro ao excluir agendamento",
        error:
          process.env.NODE_ENV === "production"
            ? "Erro interno do servidor"
            : err.message,
      });
    }
  }

  private sanitizeAppointmentData(appointment: any) {
    if (!appointment) return null;

    const data = appointment.get
      ? appointment.get({ plain: true })
      : { ...appointment };

    if (data.doctor && data.doctor.user) {
      delete data.doctor.user.password;
      delete data.doctor.user.verification_code;

      data.doctor_name = data.doctor.user.full_name;
    }

    if (data.patient && data.patient.user) {
      delete data.patient.user.password;
      delete data.patient.user.verification_code;

      data.patient_name = data.patient.user.full_name;
    }

    return data;
  }

  private validateFilters(query: any) {
    const filters: any = {};

    if (query.doctor_id && !isNaN(Number(query.doctor_id))) {
      filters.doctor_id = Number(query.doctor_id);
    }

    if (query.patient_id && !isNaN(Number(query.patient_id))) {
      filters.patient_id = Number(query.patient_id);
    }

    if (query.status && typeof query.status === "string") {
      filters.status = query.status;
    }

    if (query.date && !isNaN(Date.parse(String(query.date)))) {
      filters.date = new Date(String(query.date));
    }

    if (query.start_date && !isNaN(Date.parse(String(query.start_date)))) {
      filters.start_date = new Date(String(query.start_date));
    }

    if (query.end_date && !isNaN(Date.parse(String(query.end_date)))) {
      filters.end_date = new Date(String(query.end_date));
    }

    return filters;
  }
}
