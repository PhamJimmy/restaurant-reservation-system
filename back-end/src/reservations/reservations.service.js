const knex = require("../db/connection");

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdReservations) => createdReservations[0]);
}

function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .first();
}

function list(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .orderBy("reservation_time");
}

module.exports = {
  create,
  read,
  list,
}