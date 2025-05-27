import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export interface AppointmentAttributes {
  id: number;
  doctor_id: number;
  patient_id: number;
  appointment_date: Date;
  reason: string;
  status: "pending" | "confirmed" | "cancelled";
  patient_name: string;
  doctor_name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface AppointmentCreationAttributes
  extends Optional<AppointmentAttributes, "id" | "status"> {}

export class Appointment
  extends Model<AppointmentAttributes, AppointmentCreationAttributes>
  implements AppointmentAttributes
{
  public id!: number;
  public doctor_id!: number;
  public patient_id!: number;
  public appointment_date!: Date;
  public patient_name!: string;
  public doctor_name!: string;
  public reason!: string;
  public status!: "pending" | "confirmed" | "cancelled";

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "doctor_id",
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "patient_id",
    },
    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "appointment_date",
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
      defaultValue: "pending",
    },
    patient_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doctor_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Appointment",
    tableName: "appointments",
    underscored: true,
  }
);
