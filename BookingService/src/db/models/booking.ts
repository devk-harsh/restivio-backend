import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from "sequelize";
import sequelize from "./sequelize";
import IdempotencyKey from "./idempotencyKey";

class Booking extends Model<
    InferAttributes<Booking>, //Look at the Booking class and automatically figure out all its attributes.
    InferCreationAttributes<Booking> //Which fields are needed when creating a new record?
> {
    declare id: CreationOptional<number>;
    declare userId: number;
    declare hotelId: number;
    declare bookingAmount: number;
    declare status: "PENDING" | "CONFIRMED" | "CANCELLED";
    declare totalGuests: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>
}

Booking.init( //actual mapping
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        hotelId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        bookingAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("PENDING", "CONFIRMED", "CANCELLED"),
            allowNull: false,
        },
        totalGuests: {
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
    },
    {
        sequelize,
        modelName: "Booking",
        tableName: "bookings",
        timestamps: true,
    }
);


export default Booking;