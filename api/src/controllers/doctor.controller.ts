import { Request, Response } from "express";
import { DoctorService } from "../services/doctor.service";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

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

  async updateDoctor(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      if (!id || isNaN(Number(id))) {
        res.status(400).json({ message: "ID inválido" });
        return;
      }

      const doctorToUpdate = await this.doctorService.getDoctorById(Number(id));
      if (!doctorToUpdate) {
        res.status(404).json({ message: "Médico não encontrado" });
        return;
      }

      const isOwnDoctor = doctorToUpdate.user_id === req.user?.id;
      const isAdmin = req.user?.role === "admin";

      if (!isOwnDoctor && !isAdmin) {
        res.status(403).json({
          message: "Você não tem permissão para atualizar este médico",
        });
        return;
      }

      const updatedDoctor = await this.doctorService.updateDoctor(
        Number(id),
        data
      );
      const sanitizedDoctor = this.sanitizeDoctorData(updatedDoctor);

      res.json(sanitizedDoctor);
    } catch (error: any) {
      console.error("Error updating doctor:", error);
      res.status(500).json({
        message: "Erro ao atualizar médico",
        error:
          process.env.NODE_ENV === "production"
            ? "Erro interno do servidor"
            : error.message,
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

  async deleteDoctor(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        res.status(400).json({ message: "ID inválido" });
        return;
      }

      if (req.user?.role !== "admin") {
        res.status(403).json({
          message: "Apenas administradores podem excluir médicos",
        });
        return;
      }

      const doctorExists = await this.doctorService.getDoctorById(Number(id));
      if (!doctorExists) {
        res.status(404).json({ message: "Médico não encontrado" });
        return;
      }

      await this.doctorService.deleteDoctor(Number(id));
      res.status(204).send();
    } catch (error: any) {
      console.error("Error deleting doctor:", error);
      res.status(500).json({
        message: "Erro ao deletar médico",
        error:
          process.env.NODE_ENV === "production"
            ? "Erro interno do servidor"
            : error.message,
      });
    }
  }

  /**
   * Sanitiza os dados do médico removendo informações sensíveis
   */
  private sanitizeDoctorData(doctor: any) {
    if (!doctor) return null;

    const data = doctor.toJSON ? doctor.toJSON() : { ...doctor };

    if (data.user) {
      delete data.user.password;
      delete data.user.verification_code;

      data.email = data.user.email;
      data.full_name = data.user.full_name;
      data.phone = data.user.phone;
      data.profile_picture_url = data.user.profile_picture_url;
    }

    return data;
  }
}
