const knex = require("../db/connection");

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdTables) => createdTables[0]);
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function update(table_id, reservation_id) {
  return knex.transaction(async (trx) => {
    await trx("reservations").where({ reservation_id }).update({ status: "seated" });

    return knex("tables")
      .where({ table_id })
      .update({ reservation_id, status: "occupied" }, "*")
      .then((createdTables) => createdTables[0]);
  });
}

function finish(table_id, reservation_id) {
  return knex.transaction(async (trx) => {
    await trx("reservations").where({ reservation_id }).update({ status: "finished" });

    return trx("tables")
      .where({ table_id })
      .update({ reservation_id: null, status: "free" }, "*")
      .then((createdTables) => createdTables[0]);
  });
}

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

module.exports = {
  create,
  read,
  update,
  finish,
  list,
};
