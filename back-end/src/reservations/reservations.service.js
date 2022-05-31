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

function updateStatus(reservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation.reservation_id })
    .update({ status: reservation.status }, "*")
    .then((records) => records[0]);
}

function list(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
}

module.exports = {
  create,
  read,
  updateStatus,
  list,
}