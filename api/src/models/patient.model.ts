import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user.model";

interface PatientAttributes {
  id: number;
  user_id: number;
  birthdate: Date;
  address: string;
  city: string;
  state: string;
  gender: string;
  blood_type?: string;
  allergies?: string;
  medical_history?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface PatientCreationAttributes
  extends Optional<PatientAttributes, "id"> {}

export class Patient
  extends Model<PatientAttributes, PatientCreationAttributes>
  implements PatientAttributes
{
  public id!: number;
  public user_id!: number;
  public birthdate!: Date;
  public address!: string;
  public city!: string;
  public state!: string;
  public gender!: string;
  public blood_type?: string;
  public allergies?: string;
  public medical_history?: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public readonly user?: User;
}

Patient.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    birthdate: { type: DataTypes.DATE, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    blood_type: { type: DataTypes.STRING },
    allergies: { type: DataTypes.TEXT },
    medical_history: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    modelName: "patient",
    tableName: "patients",
    underscored: true,
  }
);

export default Patient;
