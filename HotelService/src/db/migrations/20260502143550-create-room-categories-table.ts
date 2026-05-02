import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("room_categories", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "hotels",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      room_type: {
        type: DataTypes.ENUM("SINGLE", "DOUBLE", "FAMILY", "DELUXE", "SUITE"),
        allowNull: false,
      },

      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      room_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });

    await queryInterface.addConstraint("room_categories", {
      fields: ["hotel_id", "room_type"],
      type: "unique",
      name: "unique_hotel_room_type",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("room_categories");
  },
};