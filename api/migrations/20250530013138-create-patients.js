"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      console.log("Criando tabela patients...");
      await queryInterface.createTable("patients", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        birthdate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        cpf: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        state: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        gender: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        blood_type: {
          type: Sequelize.STRING,
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
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("GETDATE"),
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
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
      await queryInterface.dropTable("patients");
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao remover tabela patients:", error);
      return Promise.reject(error);
    }
  },
};
