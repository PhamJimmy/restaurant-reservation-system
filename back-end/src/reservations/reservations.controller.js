const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = ["first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"];

function hasRequiredProperties(req, res, next) {
  const { data = {} } = req.body;
  for (let property of VALID_PROPERTIES) {
    if (!Object.keys(data).includes(property))
      return next({ status: 400, message: `${property} must be included!` });
    if (property === "mobile_number") {
      const regex = /^\d{10}$/;
      if (!data[property].match(regex))
        return next({ status: 400, message: "Must have a valid 10 digit mobile phone number." });
    }
    if (property === "people") {
      if (data[property] < 1) next({ status: 400, message: "Party size must be 1 or more." });
    }
  }
  return next();
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

function hasValidDate(req, res, next) {
  const { data = {} } = req.body;
  const date = data["reservation_date"];
  const time = data["reservation_time"];
  const reservation = new Date(`${date}T${time}`);
  const today = Date.now();

  if (reservation <= today) {
    return next({
      status: 400,
      message: "Reservation must be made in advance.",
    });
  }

  if (reservation.getUTCDay() === 2) {
    return next({
      status: 400,
      message: "The restaurant is closed on Tuesdays. Please pick another day.",
    });
  }

  return next();
}

async function create(req, res) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

async function list(req, res) {
  const reservation_date = req.query.date;
  res.json({ data: await service.list(reservation_date) });
}

module.exports = {
  create: [hasRequiredProperties, hasOnlyValidProperties, hasValidDate, asyncErrorBoundary(create)],
  list: asyncErrorBoundary(list),
};
