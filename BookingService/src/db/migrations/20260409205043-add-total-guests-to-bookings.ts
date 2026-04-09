import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("bookings", "totalGuests", {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("bookings", "totalGuests");
  }
};