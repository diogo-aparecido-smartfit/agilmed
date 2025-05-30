("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query("SELECT * FROM users", {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });

    for (const user of users) {
      if (user.role === "patient") {
        const existingPatient = await queryInterface.sequelize.query(
          "SELECT * FROM patients WHERE user_id = ?",
          {
            replacements: [user.id],
            type: queryInterface.sequelize.QueryTypes.SELECT,
          }
        );

        if (existingPatient.length === 0) {
          await queryInterface.sequelize.query(
            `INSERT INTO patients (
              user_id, birthdate, cpf, address, city, state, gender,
              created_at, updated_at
            ) VALUES (
              ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
            )`,
            {
              replacements: [
                user.id,
                user.birthdate || new Date(),
                user.cpf || `${user.id}${Math.floor(Math.random() * 10000)}`,
                user.address || "Endereço não informado",
                user.city || "Cidade não informada",
                user.state || "UF",
                user.gender || "Não informado",
              ],
              type: queryInterface.sequelize.QueryTypes.INSERT,
            }
          );
        }
      } else if (user.role === "doctor") {
        const existingDoctor = await queryInterface.sequelize.query(
          "SELECT * FROM doctors WHERE user_id = ?",
          {
            replacements: [user.id],
            type: queryInterface.sequelize.QueryTypes.SELECT,
          }
        );

        if (existingDoctor.length === 0) {
          await queryInterface.sequelize.query(
            `INSERT INTO doctors (
              user_id, specialty, crm, birthdate, cpf, address, city, state, gender,
              created_at, updated_at
            ) VALUES (
              ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
            )`,
            {
              replacements: [
                user.id,
                "Clínico Geral",
                `CRM-${user.id}${Math.floor(Math.random() * 10000)}`,
                user.birthdate || new Date(),
                user.cpf || `${user.id}${Math.floor(Math.random() * 10000)}`,
                user.address || "Endereço não informado",
                user.city || "Cidade não informada",
                user.state || "UF",
                user.gender || "Não informado",
              ],
              type: queryInterface.sequelize.QueryTypes.INSERT,
            }
          );
        }
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("DELETE FROM doctors");
    await queryInterface.sequelize.query("DELETE FROM patients");
  },
};
