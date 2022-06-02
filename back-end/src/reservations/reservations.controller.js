const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
  "reservation_id",
];

function hasRequiredProperties(req, res, next) {
  const requiredProperties = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];
  const { data = {} } = req.body;

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

function hasValidNames(req, res, next) {
  const { data = {} } = req.body;

  if (data["first_name"].length < 1) {
    return next({
      status: 400,
      message: "Property first_name cannot be empty.",
    });
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
      message: `Property people must be a number of 1 or greater.`,
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
  const errors = [];

  if (date.length === 0) errors.push("reservation_date cannot be empty.");
  if (time.length === 0) errors.push("reservation_time cannot be empty.");

  if (isNaN(Date.parse(date))) {
    errors.push("Invalid reservation_date");
  }
  
  if (errors.length) {
    return next({
      status: 400,
      message: errors.join(" ")
    })
  }
  
  if (reservation <= today) {
    return next({
      status: 400,
      message: "Reservation must be made for future date/time.",
    });
  }

  if (new Date(date).getUTCDay() === 2) {
    return next({
      status: 400,
      message: "The restaurant is closed on Tuesdays. Please pick another day.",
    });
  }

  return next();
}

function hasValidTime(req, res, next) {
  const { data = {} } = req.body;
  const time = data["reservation_time"];

  const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
  if (!regex.test(time)) {
    return next({
      status: 400,
      message: "Invalid reservation_time",
    });
  }

  const hours = Number(time.split(":")[0]);
  const minutes = Number(time.split(":")[1]);
  if (hours < 10 || (hours === 10 && minutes < 30)) {
    return next({
      status: 400,
      message: `Reservation must be after 10:30AM`,
    });
  }
  if (hours > 21 || (hours === 21 && minutes > 30)) {
    return next({
      status: 400,
      message: `Reservation must be before 9:30PM`,
    });
  }
  return next();
}

function isBooked(req, res, next) {
  const { data = {} } = req.body;
  const status = data["status"];

  if (status === "booked" || status === undefined) {
    return next();
  }
  return next({
    status: 400,
    message: `Invalid or unknown status: ${status}`
  });
}

async function create(req, res) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

async function reservationExists(req, res, next) {
  const reservation_id = req.params.reservation_id || (req.body.data || {}).reservation_id;
  const reservation = await service.read(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }

  return next({
    status: 404,
    message: `Reservation ID does not exist: ${reservation_id}`,
  });
}

async function read(req, res) {
  res.json({ data: res.locals.reservation });
}

function hasValidStatus(req, res, next) {
  const reservation = res.locals.reservation;
  const { data = {} } = req.body;
  const status = data["status"];

  if (reservation.status === "finished") {
    return next({
      status: 400,
      message: "Reservation is already finished.",
    });
  }

  const validStatuses = ["booked", "seated", "finished"];
  if (validStatuses.includes(status)) {
    return next();
  }

  return next({
    status: 400,
    message: `Invalid or unknown status: ${status}`,
  });
}

async function updateStatus(req, res) {
  const reservation = res.locals.reservation;
  const { status } = req.body.data;

  const updatedReservation = {
    ...reservation,
    status
  }

  res.json({ data: await service.updateStatus(updatedReservation) });
}

async function list(req, res) {
  const date = req.query.date;
  const mobile_number = req.query.mobile_number;
  const data = date ? await service.list(date) : await service.search(mobile_number);
  res.json({ data });
}

module.exports = {
  create: [
    hasRequiredProperties,
    hasOnlyValidProperties,
    hasValidNames,
    hasValidDate,
    hasValidTime,
    hasValidMobileNumber,
    hasValidPeople,
    isBooked,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    hasValidStatus,
    asyncErrorBoundary(updateStatus),
  ],
  list: asyncErrorBoundary(list),
  reservationExists,
};
