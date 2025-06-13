import { Request, Response } from "express";
import { DoctorService } from "../services/doctor.service";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { invalidateCache } from "../middlewares/cache.middleware";
import {
  DoctorCreationAttributes,
  DoctorAttributes,
} from "../models/doctor.model";
import { UserCreationAttributes } from "../models/user.model";
import { IDoctorService } from "../services/interfaces/doctor.interface";

export class DoctorController {
  constructor(private doctorService: IDoctorService) {}

  async createDoctor(req: Request, res: Response) {
    try {
      const data = req.body;

      const {
        full_name,
        email,
        password,
        cpf,
        phone,
        role,
        specialty,
        crm,
        birthdate,
        address,
        city,
        state,
        gender,
        bio,
        available_hours,
        ...rest
      } = data;

      const userData: UserCreationAttributes = {
        full_name,
        email,
        password,
        cpf,
        phone,
        role: "doctor",
        isVerified: false,
      };

      const doctorData: Omit<DoctorCreationAttributes, "user_id"> = {
        specialty,
        crm,
        birthdate: new Date(birthdate),
        address,
        city,
        state,
        gender,
        bio,
        available_hours,
      };

      const result = await this.doctorService.createDoctor(
        userData,
        doctorData
      );

      const { user, doctor } = result;
      const { password: _, ...userWithoutPassword } = user.dataValues;

      await invalidateCache("doctors*");
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

      const sanitizedDoctor = this.sanitizeDoctorData(doctor);
      res.json(sanitizedDoctor);
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

      const updateData: Partial<DoctorAttributes> = data;

      const updatedDoctor = await this.doctorService.updateDoctor(
        Number(id),
        updateData
      );
      const sanitizedDoctor = this.sanitizeDoctorData(updatedDoctor);

      await invalidateCache("doctors*");
      await invalidateCache(`doctors/${req.params.id}`);

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

      const sanitizedDoctors = doctors.map((doctor) =>
        this.sanitizeDoctorData(doctor)
      );

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
