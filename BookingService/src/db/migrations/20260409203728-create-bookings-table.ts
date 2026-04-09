import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("bookings", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },

      hotelId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },

      bookingAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      status: {
        type: DataTypes.ENUM("PENDING", "CONFIRMED", "CANCELLED"),
        allowNull: false
      },

      createdAt: {
        type: DataTypes.DATE(3),
        allowNull: false,
        defaultValue: DataTypes.NOW
      },

      updatedAt: {
        type: DataTypes.DATE(3),
        allowNull: false
      }
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("bookings");
  }
};