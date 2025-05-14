import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DATABASE_DB as string,
  process.env.DATABASE_USER as string,
  process.env.DATABASE_PASSWORD as string,
  {
    host: process.env.DATABASE_URL as string,
    dialect: "mssql",
    logging: true,
    define: {
      underscored: true,
    },
    dialectOptions: {
      options: {
        encrypt: true,
      },
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    retry: {
      match: [
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /TimeoutError/,
      ],
      max: 5,
    },
  }
);

export const connectDB = async () => {
  console.log("🕐 [DATABASE] Connecting...");
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("🚀 [DATABASE] Database connected successfully");
    return Promise.resolve();
  } catch (error) {
    console.error("🚨 [DATABASE] Unable to connect to the database:", error);
    return Promise.reject();
  }
};
