const service = require("./tables.service");
const { reservationExists } = require("../reservations/reservations.controller");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id"];

function hasRequiredProperties(req, res, next) {
  const { data = {} } = req.body;
  const requiredProperties = ["table_name", "capacity"];

  const errors = requiredProperties.filter((property) => {
    return !Object.keys(data).includes(property);
  });

  if (errors.length) {
    return next({
      status: 400,
      message: `Missing properties: ${errors.join(", ")}`,
    });
  } else {
    return next();
  }
}

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter((field) => !VALID_PROPERTIES.includes(field));

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

function hasValidTableName(req, res, next) {
  const { data = {} } = req.body;

  if (data["table_name"].length < 1) {
    return next({
      status: 400,
      message: "Property table_name cannot be empty.",
    });
  }

  if (data["table_name"].length === 1) {
    return next({
      status: 400,
      message: "Property table_name must be longer than one character.",
    });
  }

  return next();
}

function hasValidCapacity(req, res, next) {
  const { data = {} } = req.body;
  const capacity = data["capacity"];

  if (!Number.isInteger(capacity) || capacity < 1) {
    return next({
      status: 400,
      message: `Property capacity must be a number of 1 or greater.`,
    });
  } else {
    return next();
  }
}

async function create(req, res) {
  if (req.body.data.reservation_id) req.body.data.status = "occupied";
  res.status(201).json({ data: await service.create(req.body.data) });
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);

  if (table) {
    res.locals.table = table;
    return next();
  }
  return next({
    status: 404,
    message: `Table ID cannot be found: ${table_id}`,
  });
}

function hasEnoughCapacity(req, res, next) {
  const table = res.locals.table;
  const reservation = res.locals.reservation;

  if (reservation.people > table.capacity) {
    return next({
      status: 400,
      message: "This table does not have enough capacity for the party size.",
    });
  }

  return next();
}

function isFree(req, res, next) {
  const table = res.locals.table;

  if (table.status === "free") {
    return next();
  }
  
  return next({
    status: 400,
    message: "This table is already occupied",
  });
}

function reservationNotSeated(req, res, next) {
  const reservation = res.locals.reservation;
  if (reservation.status === "booked") {
    return next();
  }
  return next({
    status: 400,
    message: "Reservation is already seated or finished."
  })
}

function hasReservationId(req, res, next) {
  const { data = {} } = req.body;

  if (data.reservation_id) {
    return next();
  }
  return next({
    status: 400,
    message: "Missing reservation_id",
  });
}

function isOccupied(req, res, next) {
  const table = res.locals.table;

  if (table.status === "occupied") {
    return next();
  }
  return next({
    status: 400,
    message: "This table is currently not occupied.",
  });
}

async function update(req, res) {
  const table = res.locals.table;
  const reservation = res.locals.reservation;

  res.json({ data: await service.update(table.table_id, reservation.reservation_id) });
}

async function finish(req, res) {
  const table = res.locals.table;

  res.json({ data: await service.finish(table.table_id, table.reservation_id) });
}

async function list(req, res) {
  res.json({ data: await service.list() });
}

module.exports = {
  create: [
    hasRequiredProperties,
    hasOnlyValidProperties,
    hasValidTableName,
    hasValidCapacity,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(tableExists),
    hasReservationId,
    asyncErrorBoundary(reservationExists),
    hasEnoughCapacity,
    isFree,
    reservationNotSeated,
    asyncErrorBoundary(update),
  ],
  finish: [asyncErrorBoundary(tableExists), isOccupied, asyncErrorBoundary(finish)],
  list: asyncErrorBoundary(list),
};
