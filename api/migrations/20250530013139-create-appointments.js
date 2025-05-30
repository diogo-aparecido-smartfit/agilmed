"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      console.log("Criando tabela appointments...");

      // 1. Primeiro, criar a tabela sem as chaves estrangeiras
      await queryInterface.createTable("appointments", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        doctor_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        patient_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "scheduled",
        },
        notes: {
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

      console.log(
        "Tabela appointments criada. Adicionando chaves estrangeiras..."
      );

      // 2. Adicionar as chaves estrangeiras separadamente
      try {
        await queryInterface.addConstraint("appointments", {
          fields: ["doctor_id"],
          type: "foreign key",
          name: "fk_appointments_doctor",
          references: {
            table: "doctors",
            field: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
        console.log("Chave estrangeira para doctor_id adicionada com sucesso!");
      } catch (fkError) {
        console.error(
          "Erro ao adicionar chave estrangeira para doctor_id:",
          fkError
        );
      }

      try {
        await queryInterface.addConstraint("appointments", {
          fields: ["patient_id"],
          type: "foreign key",
          name: "fk_appointments_patient",
          references: {
            table: "patients",
            field: "id",
          },
          onDelete: "NO ACTION",
          onUpdate: "NO ACTION",
        });
        console.log(
          "Chave estrangeira para patient_id adicionada com sucesso!"
        );
      } catch (fkError) {
        console.error(
          "Erro ao adicionar chave estrangeira para patient_id:",
          fkError
        );
      }

      console.log("Tabela appointments criada com sucesso!");
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao criar tabela appointments:", error);
      return Promise.reject(error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      // Remover as restrições primeiro
      try {
        await queryInterface.removeConstraint(
          "appointments",
          "fk_appointments_doctor"
        );
      } catch (e) {
        console.log(
          "Constraint fk_appointments_doctor não encontrada ou já removida"
        );
      }

      try {
        await queryInterface.removeConstraint(
          "appointments",
          "fk_appointments_patient"
        );
      } catch (e) {
        console.log(
          "Constraint fk_appointments_patient não encontrada ou já removida"
        );
      }

      // Então remover a tabela
      await queryInterface.dropTable("appointments");
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao remover tabela appointments:", error);
      return Promise.reject(error);
    }
  },
};
