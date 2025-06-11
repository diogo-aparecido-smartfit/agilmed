import { AppointmentService } from "./appointment.service";
import { DoctorService } from "./doctor.service";
import { Patient } from "../models/patient.model";
import { Doctor } from "../models/doctor.model";
import { AppointmentCreationData } from "../models/appointment.model";

export class SampleDataService {
  private appointmentService: AppointmentService;
  private doctorService: DoctorService;

  constructor() {
    this.appointmentService = new AppointmentService();
    this.doctorService = new DoctorService();
  }

  /**
   * Creates sample appointments for a newly registered patient
   * This runs asynchronously without awaiting to avoid delaying registration
   */
  public createSampleAppointmentsForPatient(patient: Patient): void {
    // Execute this asynchronously without awaiting
    this.generateSampleAppointments(patient)
      .then(() =>
        console.log(`Sample appointments created for patient ${patient.id}`)
      )
      .catch((error) =>
        console.error(
          `Error creating sample appointments for patient ${patient.id}:`,
          error
        )
      );
  }

  private async generateSampleAppointments(patient: Patient): Promise<void> {
    try {
      // Get available doctors
      const doctors = await this.doctorService.getAllDoctors();
      if (!doctors || doctors.length === 0) {
        console.log("No doctors available to create sample appointments");
        return;
      }

      // Sample reasons for appointments
      const reasons = [
        "Consulta de rotina para check-up anual",
        "Dor de cabeça frequente nas últimas semanas",
        "Acompanhamento de tratamento em andamento",
        "Exame preventivo de saúde",
        "Consulta pré-operatória",
        "Avaliação de exames recentes",
      ];

      // Create completed appointment (in the past)
      await this.createAppointment(
        patient,
        this.getRandomDoctor(doctors),
        this.getRandomDate(-30, -5),
        reasons[0],
        "completed"
      );

      // Create confirmed appointment (in the future)
      await this.createAppointment(
        patient,
        this.getRandomDoctor(doctors),
        this.getRandomDate(3, 10),
        reasons[1],
        "confirmed"
      );

      // Create pending appointment (in the future)
      await this.createAppointment(
        patient,
        this.getRandomDoctor(doctors),
        this.getRandomDate(15, 30),
        reasons[2],
        "pending"
      );

      // Create cancelled appointment
      await this.createAppointment(
        patient,
        this.getRandomDoctor(doctors),
        this.getRandomDate(-15, -2),
        reasons[3],
        "cancelled"
      );
    } catch (error) {
      console.error("Error generating sample appointments:", error);
    }
  }

  private async createAppointment(
    patient: Patient,
    doctor: Doctor,
    date: Date,
    reason: string,
    status: string
  ): Promise<void> {
    try {
      const appointmentData: AppointmentCreationData = {
        doctor_id: doctor.id,
        patient_id: patient.id,
        appointment_date: date,
        reason,
        status,
      };

      await this.appointmentService.createAppointment(appointmentData);
    } catch (error) {
      console.error(`Failed to create ${status} appointment:`, error);
    }
  }

  private getRandomDoctor(doctors: Doctor[]): Doctor {
    const randomIndex = Math.floor(Math.random() * doctors.length);
    return doctors[randomIndex];
  }

  private getRandomDate(minDaysOffset: number, maxDaysOffset: number): Date {
    const today = new Date();
    const offsetDays =
      minDaysOffset +
      Math.floor(Math.random() * (maxDaysOffset - minDaysOffset));

    const result = new Date(today);
    result.setDate(today.getDate() + offsetDays);

    // Set a reasonable hour between 8 AM and 5 PM
    const hour = 8 + Math.floor(Math.random() * 9); // 8 AM to 5 PM
    const minute = Math.random() > 0.5 ? 0 : 30; // Either on the hour or half past

    result.setHours(hour, minute, 0, 0);

    return result;
  }
}
