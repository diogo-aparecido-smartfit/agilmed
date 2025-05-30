"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      console.log("Criando tabela doctors...");

      // Verificar se a tabela já existe e removê-la se necessário
      const [tableExists] = await queryInterface.sequelize.query(
        `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'doctors';`
      );

      if (tableExists.length > 0) {
        console.log("Tabela doctors já existe, removendo...");
        await queryInterface.sequelize.query(`DROP TABLE doctors;`);
      }

      // Criar tabela doctors
      await queryInterface.createTable("doctors", {
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
        specialty: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        crm: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
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
        bio: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        available_hours: {
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

      console.log("Tabela doctors criada com sucesso!");
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao criar tabela doctors:", error);
      return Promise.reject(error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      console.log("Removendo tabela doctors...");
      await queryInterface.dropTable("doctors");
      console.log("Tabela doctors removida com sucesso!");
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao remover tabela doctors:", error);
      return Promise.reject(error);
    }
  },
};
