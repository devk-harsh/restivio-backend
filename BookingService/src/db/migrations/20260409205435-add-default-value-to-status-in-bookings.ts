import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("bookings", "status", {
      type: DataTypes.ENUM("PENDING", "CONFIRMED", "CANCELLED"),
      allowNull: false,
      defaultValue: "PENDING"
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("bookings", "status", {
      type: DataTypes.ENUM("PENDING", "CONFIRMED", "CANCELLED"),
      allowNull: false,
      defaultValue: null
    });
  }
};