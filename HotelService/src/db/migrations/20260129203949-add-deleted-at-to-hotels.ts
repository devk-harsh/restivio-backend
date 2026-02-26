import { QueryInterface ,DataTypes} from "sequelize";
module.exports = {
  // Add deletedAt column to hotels table
  async up (queryInterface : QueryInterface) {
    await queryInterface.addColumn('hotels', 'deleted_at', {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    });
  },

  async down (queryInterface : QueryInterface) {
    await queryInterface.removeColumn('hotels', 'deleted_at');
  }
};
