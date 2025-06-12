import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import bcrypt from "bcryptjs";

export interface UserAttributes {
  id: number;
  full_name: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
  profile_picture_url?: string | null;
  verificationCode?: string | null;
  isVerified: boolean;
  role: "doctor" | "patient" | "admin";
  created_at?: Date;
  updated_at?: Date;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "isVerified"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public full_name!: string;
  public email!: string;
  public password!: string;
  public phone!: string;
  public cpf!: string;
  public profile_picture_url?: string | null;
  public verificationCode?: string | null;
  public isVerified!: boolean;
  public role!: "doctor" | "patient" | "admin";

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    full_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
    profile_picture_url: { type: DataTypes.STRING, allowNull: true },
    verificationCode: { type: DataTypes.STRING, allowNull: true },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    role: {
      type: DataTypes.ENUM("doctor", "patient", "admin"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users",
    underscored: true,
    hooks: {
      beforeSave: async (user) => {
        if (user.changed("password")) {
          if (!user.password.startsWith("$2")) {
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);
          }
        }
      },
    },
  }
);

export default User;
