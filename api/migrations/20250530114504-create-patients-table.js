"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      console.log("Criando tabela patients...");

      // Verificar se a tabela já existe e removê-la se necessário
      const [tableExists] = await queryInterface.sequelize.query(
        `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'patients';`
      );

      if (tableExists.length > 0) {
        console.log("Tabela patients já existe, removendo...");
        await queryInterface.sequelize.query(`DROP TABLE patients;`);
      }

      // Criar tabela patients
      await queryInterface.createTable("patients", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        birthdate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        state: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        gender: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        blood_type: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        allergies: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        medical_history: {
          type: Sequelize.TEXT,
          allowNull: true,
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

      console.log("Tabela patients criada com sucesso!");
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao criar tabela patients:", error);
      return Promise.reject(error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      console.log("Removendo tabela patients...");
      await queryInterface.dropTable("patients");
      console.log("Tabela patients removida com sucesso!");
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao remover tabela patients:", error);
      return Promise.reject(error);
    }
  },
};
