"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // ...existing code...
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("appointments", "patient_name", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    });
    await queryInterface.addColumn("appointments", "doctor_name", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("appointments", "patient_name");
    await queryInterface.removeColumn("appointments", "doctor_name");
  },
  // ...existing code...
};
