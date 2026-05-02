import {CreationOptional,DataTypes,InferAttributes,InferCreationAttributes,Model,} from "sequelize";
import sequelize from "./sequelize";

class Room extends Model<InferAttributes<Room>, InferCreationAttributes<Room>> {
  declare id: CreationOptional<number>;
  declare hotelId: number;
  declare roomCategoryId: number;
  declare roomNo: number;
  declare dateOfAvailability: string;
  declare bookingId: CreationOptional<number | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    hotelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    roomCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    roomNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    dateOfAvailability: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "rooms",
    modelName: "Room",
    underscored: true,
    timestamps: true,
  }
);

export default Room;