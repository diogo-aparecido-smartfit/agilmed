import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import Doctor, { DoctorAttributes } from "./doctor.model";
import Patient, { PatientAttributes } from "./patient.model";

export interface AppointmentAttributes {
  id: number;
  doctor_id: number;
  patient_id: number;
  appointment_date: Date;
  reason: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes?: string | null;
  created_at?: Date;
  updated_at?: Date;
  doctor?: DoctorAttributes;
  patient?: PatientAttributes;
}

export interface AppointmentCreationAttributes
  extends Optional<AppointmentAttributes, "id" | "doctor" | "patient"> {}

export interface AppointmentFilters {
  doctor_id?: number;
  patient_id?: number;
  status?: string;
  date?: Date;
  start_date?: Date;
  end_date?: Date;
}

class Appointment
  extends Model<AppointmentAttributes, AppointmentCreationAttributes>
  implements AppointmentAttributes
{
  public id!: number;
  public doctor_id!: number;
  public patient_id!: number;
  public appointment_date!: Date;
  public reason!: string;
  public status!: "pending" | "confirmed" | "cancelled" | "completed";
  public notes?: string | null;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public readonly doctor?: Doctor;
  public readonly patient?: Patient;
}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "appointment",
    tableName: "appointments",
    underscored: true,
  }
);

export default Appointment;
