"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remover a constraint antiga
    await queryInterface.removeConstraint(
      "appointments",
      "FK__appointme__docto__73BA3083"
    );

    // Adicionar a constraint com ON DELETE CASCADE
    await queryInterface.addConstraint("appointments", {
      fields: ["patient_id"],
      type: "foreign key",
      name: "FK__appointme__docto__73BA3083", // mesmo nome da constraint antiga
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove a constraint com CASCADE
    await queryInterface.removeConstraint(
      "appointments",
      "FK__appointme__docto__73BA3083"
    );

    // Adiciona novamente sem CASCADE (ajuste conforme estava antes)
    await queryInterface.addConstraint("appointments", {
      fields: ["patient_id"],
      type: "foreign key",
      name: "FK__appointme__docto__73BA3083",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  },
};
