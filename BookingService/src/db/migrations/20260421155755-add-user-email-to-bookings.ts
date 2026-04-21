import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("bookings", "userEmail", {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "temp@example.com",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("bookings", "userEmail");
  },
};