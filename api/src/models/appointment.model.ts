import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface AppointmentAttributes {
  id: number;
  doctor_id: number;
  patient_id: number;
  appointment_date: Date;
  reason: string;
  status: "pending" | "confirmed" | "cancelled";
}

interface AppointmentCreationAttributes
  extends Optional<AppointmentAttributes, "id"> {}

export class Appointment
  extends Model<AppointmentAttributes, AppointmentCreationAttributes>
  implements AppointmentAttributes
{
  public id!: number;
  public doctor_id!: number;
  public patient_id!: number;
  public appointment_date!: Date;
  public reason!: string;
  public status!: "pending" | "confirmed" | "cancelled";
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "appointment",
  }
);
