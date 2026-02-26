'use strict';
import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable("hotels", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      location: {
        type: DataTypes.STRING(255),
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
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable("hotels");
  },
};
