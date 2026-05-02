import {CreationOptional,DataTypes,InferAttributes,InferCreationAttributes,Model,} from "sequelize";
import sequelize from "./sequelize";

export enum RoomType {
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE",
  FAMILY = "FAMILY",
  DELUXE = "DELUXE",
  SUITE = "SUITE",
}

class RoomCategory extends Model<
  InferAttributes<RoomCategory>,
  InferCreationAttributes<RoomCategory>
> {
  declare id: CreationOptional<number>;
  declare hotelId: number;
  declare roomType: RoomType;
  declare price: number;
  declare roomCount: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
}

RoomCategory.init(
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
    roomType: {
      type: DataTypes.ENUM(...Object.values(RoomType)),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: "room_categories",
    modelName: "RoomCategory",
    underscored: true,
    timestamps: true,
  }
);

export default RoomCategory;