require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASSWORD || "postgres",
    database: process.env.DATABASE_DB || "agilmed",
    host: process.env.DATABASE_URL || "postgres",
    dialect: "postgres",
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    host: process.env.DATABASE_URL,
    dialect: "postgres",
  },
};
