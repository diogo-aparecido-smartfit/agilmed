"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      console.log("Criando tabela users...");
      await queryInterface.createTable("users", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        full_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        profile_picture_url: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        role: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "patient",
        },
        verification_code: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        is_verified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
      console.log("Tabela users criada com sucesso!");
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao criar tabela users:", error);
      return Promise.reject(error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable("users");
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao remover tabela users:", error);
      return Promise.reject(error);
    }
  },
};
