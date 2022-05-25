const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { set } = require("../app");

const VALID_PROPERTIES = ["first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"];

function hasRequiredProperties(req, res, next) {
  const { data = {} } = req.body;

  const errors = VALID_PROPERTIES.filter((property) => {
    return !Object.keys(data).includes(property);
  });

  if (errors.length) {
    return next({
      status: 400,
      message: `Invalid properties: ${errors.join(", ")}`,
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

function hasValidNames(req, res, next) {
  const { data = {} } = req.body;

  if (data["first_name"].length < 1) {
    return next({
      status: 400,
      message: "Property first_name cannot be empty."
    })
  }

  if (data["last_name"].length < 1) {
    return next({
      status: 400,
      message: "Property last_name cannot be empty.",
    });
  }  

  return next();
}

function hasValidMobileNumber(req, res, next) {
  const { data = {} } = req.body;
  const regex = /\d/g; // checks for digits only
  const number = data["mobile_number"];

  if (!number || !number.match(regex).length === 10) {
    return next({
      status: 400,
      message: "Invalid mobile_number",
    });
  }

  return next();
}

function hasValidPeople(req, res, next) {
  const { data = {} } = req.body;
  const people = data["people"];

  if (!Number.isInteger(people) || people < 1) {
    return next({
      status: 400,
      message: `Property people must be a number of 1 or greater. ${people}`,
    });
  } else {
    return next();
  }
}

function hasValidDate(req, res, next) {
  const { data = {} } = req.body;
  const date = data["reservation_date"];
  const time = data["reservation_time"];
  const reservation = new Date(`${date}T${time}`);
  const today = Date.now();

  if (date.length === 0) errors.push("reservation_date cannot be empty.");
  if (time.length === 0) errors.push("reservation_time cannot be empty.");

  if (isNaN(Date.parse(date))) {
    errors.push("Invalid reservation_date");
  }

  const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
  if (!regex.test(time)) {
    return next({
      status: 400,
      message: "Invalid reservation_time"
    })
  }

  if (reservation <= today) {
    return next({
      status: 400,
      message: "Reservation must be made for future date/time."
    })
  }

  if (new Date(date).getUTCDay() === 2) {
    return next({
      status: 400,
      message: "The restaurant is closed on Tuesdays. Please pick another day."
    })
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
  create: [
    hasRequiredProperties,
    hasOnlyValidProperties,
    hasValidNames,
    hasValidDate,
    hasValidMobileNumber,
    hasValidPeople,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
};
