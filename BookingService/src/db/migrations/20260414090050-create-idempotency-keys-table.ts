import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("idempotency_keys", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      idemKey: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },

      finalized: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      bookingId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        references: { // This makes bookingId a foreign key pointing to bookings.id.
          model: "bookings",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },

      createdAt: {
        type: DataTypes.DATE(3),
        allowNull: false,
        defaultValue: DataTypes.NOW
      },

      updatedAt: {
        type: DataTypes.DATE(3),
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("idempotency_keys");
  }
};