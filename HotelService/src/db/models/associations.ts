import Hotel from "./hotel";
import Room from "./room";
import RoomCategory from "./roomCategory";

Hotel.hasMany(RoomCategory, {
  foreignKey: "hotelId",
  as: "roomCategories",
});
RoomCategory.belongsTo(Hotel, {
  foreignKey: "hotelId",
  as: "hotel",
});
Hotel.hasMany(Room, {
  foreignKey: "hotelId",
  as: "rooms",
});
Room.belongsTo(Hotel, {
  foreignKey: "hotelId",
  as: "hotel",
});
RoomCategory.hasMany(Room, {
  foreignKey: "roomCategoryId",
  as: "rooms",
});
Room.belongsTo(RoomCategory, {
  foreignKey: "roomCategoryId",
  as: "roomCategory",
});