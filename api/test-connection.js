const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATABASE_DB,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_URL,
    dialect: "mssql",
    logging: console.log,
    dialectOptions: {
      options: {
        encrypt: true,
        requestTimeout: 30000,
      },
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
