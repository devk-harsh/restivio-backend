import Booking from "./booking";
import IdempotencyKey from "./idempotencyKey";

// Define the one-to-one association between Booking and IdempotencyKey
Booking.hasOne(IdempotencyKey, {
    foreignKey: "bookingId",
    as: "idempotencyKey",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

// Define the one-to-one association between IdempotencyKey and Booking
IdempotencyKey.belongsTo(Booking, {
    foreignKey: "bookingId",
    as: "booking",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});


export { Booking, IdempotencyKey };