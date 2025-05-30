"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      console.log("Criando tabela doctors...");
      await queryInterface.createTable("doctors", {
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
        specialty: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        crm: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
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
        bio: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        available_hours: {
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
      console.log("Tabela doctors criada com sucesso!");
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao criar tabela doctors:", error);
      return Promise.reject(error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable("doctors");
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao remover tabela doctors:", error);
      return Promise.reject(error);
    }
  },
};
