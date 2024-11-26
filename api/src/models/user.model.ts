import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import bcrypt from "bcrypt";

interface UserAttributes {
  id: number;
  full_name: string;
  birthdate: Date;
  cpf: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  password: string;
  gender: string;
  blood_type?: string;
  allergies?: string;
  medical_history?: string;
  verificationCode?: string | null;
  isVerified?: boolean;
  profile_picture_url?: string | null;
  chatbot_user_id?: string | null;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public full_name!: string;
  public birthdate!: Date;
  public cpf!: string;
  public address!: string;
  public city!: string;
  public state!: string;
  public phone!: string;
  public email!: string;
  public password!: string;
  public gender!: string;
  public blood_type?: string;
  public allergies?: string;
  public medical_history?: string;
  public verificationCode?: string | null;
  public profile_picture_url?: string | null;
  public chatbot_user_id?: string | null;
  public isVerified!: boolean;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    full_name: { type: DataTypes.STRING, allowNull: false },
    birthdate: { type: DataTypes.DATE, allowNull: false },
    cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    blood_type: { type: DataTypes.STRING },
    allergies: { type: DataTypes.TEXT },
    medical_history: { type: DataTypes.TEXT },
    verificationCode: { type: DataTypes.STRING, allowNull: true },
    profile_picture_url: { type: DataTypes.STRING, allowNull: true },
    chatbot_user_id: { type: DataTypes.STRING, allowNull: true },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    modelName: "user",
    hooks: {
      beforeCreate: async (user) => {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
      },
      beforeSave: async (user) => {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
      },
    },
  }
);
