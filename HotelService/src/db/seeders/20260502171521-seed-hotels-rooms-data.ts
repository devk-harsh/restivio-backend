import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("hotels", [
      {
        id: 1,
        name: "Ocean View Hotel",
        address: "123 Beachside Lane",
        location: "Goa",
        rating: 4.5,
        rating_count: 120,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: 2,
        name: "Mountain Retreat",
        address: "456 Hilltop Road",
        location: "Manali",
        rating: 4.7,
        rating_count: 90,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);

    await queryInterface.bulkInsert("room_categories", [
      {
        id: 1,
        hotel_id: 1,
        room_type: "SINGLE",
        price: 3000,
        room_count: 10,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: 2,
        hotel_id: 1,
        room_type: "DOUBLE",
        price: 5000,
        room_count: 8,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: 3,
        hotel_id: 2,
        room_type: "DELUXE",
        price: 8000,
        room_count: 5,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: 4,
        hotel_id: 2,
        room_type: "SUITE",
        price: 12000,
        room_count: 2,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);

    await queryInterface.bulkInsert("rooms", [
      {
        hotel_id: 1,
        room_category_id: 1,
        room_no: 101,
        date_of_availability: "2026-05-10",
        booking_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        hotel_id: 1,
        room_category_id: 1,
        room_no: 101,
        date_of_availability: "2026-05-11",
        booking_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        hotel_id: 1,
        room_category_id: 2,
        room_no: 201,
        date_of_availability: "2026-05-10",
        booking_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        hotel_id: 2,
        room_category_id: 3,
        room_no: 301,
        date_of_availability: "2026-05-10",
        booking_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("rooms", {}, {});
    await queryInterface.bulkDelete("room_categories", {}, {});
    await queryInterface.bulkDelete("hotels", { id: [1, 2] }, {});
  },
};