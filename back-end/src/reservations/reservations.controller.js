/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function create(req, res) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

async function list(req, res) {
  res.json({ data: await service.list() })
}

module.exports = {
  create: asyncErrorBoundary(create),
  list: asyncErrorBoundary(list),
};
