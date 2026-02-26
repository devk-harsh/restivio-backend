import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE hotels
      ADD COLUMN rating DECIMAL(3,2) DEFAULT NULL AFTER location,
      ADD COLUMN rating_count INT DEFAULT NULL AFTER rating;
    `)
  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE hotels
      DROP COLUMN rating,
      DROP COLUMN rating_count;
    `)
  }
};
