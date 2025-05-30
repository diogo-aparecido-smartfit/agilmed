"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
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
        "Chave estrangeira corrigida para patient_id adicionada com sucesso!"
      );
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao adicionar chave estrangeira corrigida:", error);
      return Promise.reject(error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeConstraint(
        "appointments",
        "fk_appointments_patient"
      );
      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao remover chave estrangeira:", error);
      return Promise.reject(error);
    }
  },
};
