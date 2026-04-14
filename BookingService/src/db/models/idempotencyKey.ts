import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from "sequelize";
import sequelize from "./sequelize";

class IdempotencyKey extends Model<
  InferAttributes<IdempotencyKey>,
  InferCreationAttributes<IdempotencyKey>
> {
  declare id: CreationOptional<number>;
  declare idemKey: string;
  declare finalized: CreationOptional<boolean>;
  declare bookingId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

IdempotencyKey.init(
  {
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
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "IdempotencyKey",
    tableName: "idempotency_keys",
    timestamps: true,
  }
);


export default IdempotencyKey;