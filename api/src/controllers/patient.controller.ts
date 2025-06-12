import { Request, Response } from "express";
import { PatientService } from "../services/patient.service";
import { container } from "../di/container";
import { DI_TOKENS } from "../di/tokens";

export class PatientController {
  private patientService: PatientService;

  constructor() {
    this.patientService = container.resolve<PatientService>(
      DI_TOKENS.PATIENT_SERVICE
    );
  }

  async createPatient(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await this.patientService.createPatient(data);

      const { user, patient } = result;
      const { password, ...userWithoutPassword } = user.dataValues;

      res.status(201).json({
        user: userWithoutPassword,
        patient,
      });
    } catch (error: any) {
      console.error("Error creating patient:", error);
      res.status(500).json({
        message: "Erro ao criar paciente",
        error: error.message,
      });
    }
  }

  async getPatientById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const patient = await this.patientService.getPatientById(Number(id));

      if (!patient) {
        res.status(404).json({ message: "Paciente não encontrado" });
        return;
      }

      if (patient.user) {
        const { password, ...userWithoutPassword } = patient.user.dataValues;
        const sanitizedPatient = {
          ...patient,
          user: userWithoutPassword as any,
        };
        res.json(sanitizedPatient);
        return;
      }

      res.json(patient);
    } catch (error: any) {
      console.error("Error getting patient:", error);
      res.status(500).json({
        message: "Erro ao buscar paciente",
        error: error.message,
      });
    }
  }

  async updatePatient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      const patient = await this.patientService.updatePatient(Number(id), data);

      if (!patient) {
        res.status(404).json({ message: "Paciente não encontrado" });
        return;
      }

      res.json(patient);
    } catch (error: any) {
      console.error("Error updating patient:", error);
      res.status(500).json({
        message: "Erro ao atualizar paciente",
        error: error.message,
      });
    }
  }

  async getAllPatients(req: Request, res: Response) {
    try {
      const filters = req.query;
      const patients = await this.patientService.getAllPatients(filters);

      const sanitizedPatients = patients.map((patient) => {
        const patientData = patient.get({ plain: true });

        if ((patientData as any).user && (patientData as any).user.password) {
          delete (patientData as any).user.password;
        }

        return patientData;
      });

      res.json(sanitizedPatients);
    } catch (error: any) {
      console.error("Error getting all patients:", error);
      res.status(500).json({
        message: "Erro ao buscar pacientes",
        error: error.message,
      });
    }
  }

  async deletePatient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.patientService.deletePatient(Number(id));
      res.status(204).send();
    } catch (error: any) {
      console.error("Error deleting patient:", error);
      res.status(500).json({
        message: "Erro ao deletar paciente",
        error: error.message,
      });
    }
  }
}
