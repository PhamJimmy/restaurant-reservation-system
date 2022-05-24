const service = require("./reservations.service");
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// function validateReservation(req, res, next) {
//   (reservation) => {
//     const properties = ["first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"]
//     for (let property of properties) {
//       if (!Object.keys(reservation).includes(property)) return next({ status: 400, message: `${property} must be included!`})
//       if (property === "mobile_number") {
//         const regex = /^\d{10}$/;
//         if (!reservation[property].match(regex)) return next({ status: 400, message: "Must have a valid 10 digit mobile phone number."})
//       }
//       if (property === "people") {
//         if (!reservation[property] < 1) next({ status: 400, message: "Party size must be 1 or more."})
//       }
//     }
//     return next();
//   }
// }

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

async function create(req, res) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

async function list(req, res) {
  const reservation_date = req.query.date;
  res.json({ data: await service.list(reservation_date) })
}

module.exports = {
  create: asyncErrorBoundary(create),
  list: asyncErrorBoundary(list),
};
