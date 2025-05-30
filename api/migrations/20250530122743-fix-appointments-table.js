"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Verificar se a tabela appointments existe e droppá-la
      try {
        await queryInterface.sequelize.query(`
          IF OBJECT_ID('appointments', 'U') IS NOT NULL 
          DROP TABLE appointments;
        `);
        console.log("Tabela appointments removida com sucesso.");
      } catch (dropError) {
        console.error(
          "Erro ao remover tabela appointments:",
          dropError.message
        );
        // Continuar mesmo se houver erro ao remover
      }

      // Criar a tabela sem as chaves estrangeiras inicialmente
      await queryInterface.sequelize.query(`
        CREATE TABLE appointments (
          id INT IDENTITY(1,1) PRIMARY KEY,
          doctor_id INT NOT NULL,
          patient_id INT NOT NULL,
          appointment_date DATETIMEOFFSET NOT NULL,
          reason NVARCHAR(MAX) NOT NULL,
          status NVARCHAR(20) NOT NULL DEFAULT 'pending',
          notes NVARCHAR(MAX) NULL,
          created_at DATETIMEOFFSET NOT NULL DEFAULT GETDATE(),
          updated_at DATETIMEOFFSET NOT NULL DEFAULT GETDATE()
        );
      `);
      console.log("Tabela appointments criada com sucesso.");

      // Verificar se as tabelas de referência existem
      const [doctorsExists] = await queryInterface.sequelize.query(`
        SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'doctors';
      `);

      const [patientsExists] = await queryInterface.sequelize.query(`
        SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'patients';
      `);

      // Adicionar chaves estrangeiras se as tabelas existirem
      if (doctorsExists.length > 0) {
        try {
          await queryInterface.sequelize.query(`
            ALTER TABLE appointments
            ADD CONSTRAINT FK_appointments_doctor
            FOREIGN KEY (doctor_id) REFERENCES doctors(id)
            ON DELETE CASCADE ON UPDATE CASCADE;
          `);
          console.log(
            "Chave estrangeira para doctor_id adicionada com sucesso."
          );
        } catch (fkError) {
          console.error(
            "Erro ao adicionar chave estrangeira para doctor_id:",
            fkError.message
          );
          // Continuar mesmo se houver erro na chave estrangeira
        }
      } else {
        console.log(
          "Tabela doctors não encontrada. Chave estrangeira não adicionada."
        );
      }

      if (patientsExists.length > 0) {
        try {
          await queryInterface.sequelize.query(`
            ALTER TABLE appointments
            ADD CONSTRAINT FK_appointments_patient
            FOREIGN KEY (patient_id) REFERENCES patients(id)
            ON DELETE CASCADE ON UPDATE CASCADE;
          `);
          console.log(
            "Chave estrangeira para patient_id adicionada com sucesso."
          );
        } catch (fkError) {
          console.error(
            "Erro ao adicionar chave estrangeira para patient_id:",
            fkError.message
          );
          // Continuar mesmo se houver erro na chave estrangeira
        }
      } else {
        console.log(
          "Tabela patients não encontrada. Chave estrangeira não adicionada."
        );
      }

      // Adicionar a migration à tabela SequelizeMeta (caso não seja adicionada automaticamente)
      try {
        await queryInterface.sequelize.query(`
          IF NOT EXISTS (SELECT 1 FROM SequelizeMeta WHERE name = '20250530122743-fix-appointments-table.js')
          INSERT INTO SequelizeMeta (name) VALUES ('20250530122743-fix-appointments-table.js');
        `);
      } catch (metaError) {
        console.error("Erro ao atualizar SequelizeMeta:", metaError.message);
      }

      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao recriar tabela appointments:", error);
      return Promise.reject(error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.sequelize.query(`
        IF OBJECT_ID('appointments', 'U') IS NOT NULL 
        DROP TABLE appointments;
      `);
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao remover tabela appointments:", error);
      return Promise.reject(error);
    }
  },
};
