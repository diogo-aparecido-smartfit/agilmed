import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user.model";

export interface DoctorAttributes {
  id: number;
  user_id: number;
  specialty: string;
  crm: string;
  birthdate: Date;
  address: string;
  city: string;
  state: string;
  gender: string;
  bio?: string;
  available_hours?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface DoctorFilters {
  specialty?: string;
  name?: string;
}

export interface DoctorCreationAttributes
  extends Optional<DoctorAttributes, "id"> {}

export class Doctor
  extends Model<DoctorAttributes, DoctorCreationAttributes>
  implements DoctorAttributes
{
  public id!: number;
  public user_id!: number;
  public specialty!: string;
  public crm!: string;
  public birthdate!: Date;
  public address!: string;
  public city!: string;
  public state!: string;
  public gender!: string;
  public bio?: string;
  public available_hours?: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public readonly user?: User;
}

Doctor.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    specialty: { type: DataTypes.STRING, allowNull: false },
    crm: { type: DataTypes.STRING, allowNull: false, unique: true },
    birthdate: { type: DataTypes.DATE, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    bio: { type: DataTypes.TEXT },
    available_hours: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    modelName: "doctor",
    tableName: "doctors",
    underscored: true,
  }
);

export default Doctor;
