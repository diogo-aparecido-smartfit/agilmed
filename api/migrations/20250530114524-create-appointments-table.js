"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      console.log("Criando tabela appointments...");

      // Verificar se a tabela já existe e removê-la se necessário
      const [tableExists] = await queryInterface.sequelize.query(
        `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'appointments';`
      );

      if (tableExists.length > 0) {
        console.log("Tabela appointments já existe, removendo...");
        await queryInterface.sequelize.query(`DROP TABLE appointments;`);
      }

      // Verificar se as tabelas de referência existem
      const [doctorsExists] = await queryInterface.sequelize.query(
        `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'doctors';`
      );

      const [patientsExists] = await queryInterface.sequelize.query(
        `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'patients';`
      );

      if (doctorsExists.length === 0) {
        console.log("Tabela doctors não existe. Criando tabela doctors...");
        // Criar uma versão simplificada da tabela doctors se necessário
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
          },
          specialty: {
            type: Sequelize.STRING(255),
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
      }

      if (patientsExists.length === 0) {
        console.log("Tabela patients não existe. Criando tabela patients...");
        // Criar uma versão simplificada da tabela patients se necessário
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
      }

      // Criar tabela appointments (sem constraints de FK inicialmente)
      await queryInterface.createTable("appointments", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
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
          type: Sequelize.STRING(20),
          allowNull: false,
          defaultValue: "scheduled",
        },
        notes: {
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

      // Adicionar as chaves estrangeiras com try/catch para cada uma
      console.log("Adicionando chaves estrangeiras à tabela appointments...");

      // Chave estrangeira para doctor_id
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
        console.log("Chave estrangeira para doctor_id adicionada com sucesso");
      } catch (error) {
        console.error(
          "Erro ao adicionar chave estrangeira para doctor_id:",
          error.message
        );
        // Continuar apesar do erro
      }

      // Chave estrangeira para patient_id
      try {
        await queryInterface.addConstraint("appointments", {
          fields: ["patient_id"],
          type: "foreign key",
          name: "fk_appointments_patient",
          references: {
            table: "patients",
            field: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
        console.log("Chave estrangeira para patient_id adicionada com sucesso");
      } catch (error) {
        console.error(
          "Erro ao adicionar chave estrangeira para patient_id:",
          error.message
        );
        // Continuar apesar do erro
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
      console.log("Removendo tabela appointments...");
      await queryInterface.dropTable("appointments");
      console.log("Tabela appointments removida com sucesso!");
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao remover tabela appointments:", error);
      return Promise.reject(error);
    }
  },
};
