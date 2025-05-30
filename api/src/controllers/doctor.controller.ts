import { Request, Response } from "express";
import { DoctorService } from "../services/doctor.service";

export class DoctorController {
  private doctorService: DoctorService;

  constructor() {
    this.doctorService = new DoctorService();
  }

  async createDoctor(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await this.doctorService.createDoctor(data);

      const { user, doctor } = result;
      const { password, ...userWithoutPassword } = user.dataValues;

      res.status(201).json({
        user: userWithoutPassword,
        doctor,
      });
    } catch (error: any) {
      console.error("Error creating doctor:", error);
      res.status(500).json({
        message: "Erro ao criar médico",
        error: error.message,
      });
    }
  }

  async getDoctorById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const doctor = await this.doctorService.getDoctorById(Number(id));

      if (!doctor) {
        res.status(404).json({ message: "Médico não encontrado" });
        return;
      }

      if (doctor.user) {
        const { password, ...userWithoutPassword } = doctor.user.dataValues;
        const sanitizedDoctor = { ...doctor, user: userWithoutPassword };
        res.json(sanitizedDoctor);
        return;
      }

      res.json(doctor);
    } catch (error: any) {
      console.error("Error getting doctor:", error);
      res.status(500).json({
        message: "Erro ao buscar médico",
        error: error.message,
      });
    }
  }

  async updateDoctor(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      const doctor = await this.doctorService.updateDoctor(Number(id), data);

      if (!doctor) {
        res.status(404).json({ message: "Médico não encontrado" });
        return;
      }

      res.json(doctor);
    } catch (error: any) {
      console.error("Error updating doctor:", error);
      res.status(500).json({
        message: "Erro ao atualizar médico",
        error: error.message,
      });
    }
  }

  async getAllDoctors(req: Request, res: Response) {
    try {
      const filters = req.query;
      const doctors = await this.doctorService.getAllDoctors(filters);

      const sanitizedDoctors = doctors.map((doctor) => {
        if (doctor.user) {
          const { password, ...userWithoutPassword } = doctor.user.dataValues;
          const sanitizedDoctor = {
            ...doctor.toJSON(),
            user: userWithoutPassword,
          };
          Object.assign(doctor, sanitizedDoctor);
        }
        return doctor;
      });

      res.json(sanitizedDoctors);
    } catch (error: any) {
      console.error("Error getting all doctors:", error);
      res.status(500).json({
        message: "Erro ao buscar médicos",
        error: error.message,
      });
    }
  }

  async deleteDoctor(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.doctorService.deleteDoctor(Number(id));
      res.status(204).send();
    } catch (error: any) {
      console.error("Error deleting doctor:", error);
      res.status(500).json({
        message: "Erro ao deletar médico",
        error: error.message,
      });
    }
  }
}
