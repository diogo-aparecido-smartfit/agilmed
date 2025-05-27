require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DB_URL,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
  },
};
