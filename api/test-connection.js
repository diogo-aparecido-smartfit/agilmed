const { Sequelize } = require("sequelize");
require("dotenv").config();

export const sequelize = new Sequelize(
  process.env.DATABASE_DB,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_URL,
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development",
    define: {
      underscored: true,
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

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexão estabelecida com sucesso.");

    // Testar uma consulta simples
    try {
      const result = await sequelize.query("SELECT 1 as test");
      console.log("Consulta executada com sucesso:", result);
    } catch (queryError) {
      console.error("Erro ao executar consulta:", queryError);
    }
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
