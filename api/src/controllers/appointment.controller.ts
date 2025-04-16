import { Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service";

export class AppointmentController {
  private appointmentService: AppointmentService;

  constructor() {
    this.appointmentService = new AppointmentService();
  }

  async createAppointment(req: Request, res: Response) {
    try {
      const appointment = await this.appointmentService.createAppointment(
        req.body
      );
      res.status(201).json(appointment);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erro ao criar agendamento", error: err });
    }
  }

  async getAllAppointments(req: Request, res: Response) {
    try {
      const appointments = await this.appointmentService.getAllAppointments();
      res.json(appointments);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erro ao buscar agendamentos", error: err });
    }
  }

  async getAppointmentById(req: Request, res: Response) {
    const { id } = req.params;
    const appointment = await this.appointmentService.getAppointmentById(
      Number(id)
    );

    if (appointment) res.json(appointment);
    else res.status(404).json({ message: "Agendamento não encontrado" });
  }

  async updateAppointment(req: Request, res: Response) {
    const { id } = req.params;
    const updated = await this.appointmentService.updateAppointment(
      Number(id),
      req.body
    );

    if (updated) res.json(updated);
    else res.status(404).json({ message: "Agendamento não encontrado" });
  }

  async deleteAppointment(req: Request, res: Response) {
    await this.appointmentService.deleteAppointment(Number(req.params.id));
    res.status(204).send();
  }
}
