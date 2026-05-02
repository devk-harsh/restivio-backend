import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("rooms", {
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
      room_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "room_categories",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      room_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date_of_availability: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      booking_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
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
    await queryInterface.addConstraint("rooms", {
      fields: ["hotel_id", "room_no", "date_of_availability"],
      type: "unique",
      name: "unique_hotel_room_per_date",
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("rooms");
  },
};