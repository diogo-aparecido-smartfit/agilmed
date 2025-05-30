"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      console.log("Criando tabela users...");

      // Verificar se a tabela já existe e removê-la se necessário
      const [tableExists] = await queryInterface.sequelize.query(
        `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'users';`
      );

      if (tableExists.length > 0) {
        console.log("Tabela users já existe, removendo...");
        await queryInterface.sequelize.query(`DROP TABLE users;`);
      }

      // Criar tabela users
      await queryInterface.createTable("users", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        full_name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        cpf: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        profile_picture_url: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        verification_code: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        is_verified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        role: {
          type: Sequelize.ENUM("doctor", "patient", "admin"),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("GETDATE"),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("GETDATE"),
        },
      });

      console.log("Tabela users criada com sucesso!");
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao criar tabela users:", error);
      return Promise.reject(error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      console.log("Removendo tabela users...");
      await queryInterface.dropTable("users");
      console.log("Tabela users removida com sucesso!");
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao remover tabela users:", error);
      return Promise.reject(error);
    }
  },
};
