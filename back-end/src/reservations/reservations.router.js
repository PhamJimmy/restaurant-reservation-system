const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    Reservation:
 *      type: object
 *      required:
 *        - first_name
 *        - last_name
 *        - mobile_number
 *        - reservation_date
 *        - reservation_time
 *        - people
 *        - status
 *      properties:
 *        reservation_id:
 *          type: integer
 *          description: The auto-generated id of the reservation.
 *        first_name:
 *          type: string
 *          description: The first name of the customer.
 *        last_name:
 *          type: string
 *          description: The last name of the customer.
 *        mobile_number:
 *          type: string
 *          description: The mobile number of the customer.
 *        reservation_date:
 *          type: date
 *          description: The reservation date.
 *        reservation_time:
 *          type: time
 *          description: The reservation time.
 *        people:
 *          type: integer
 *          description: The amount of people in the party.
 *        status:
 *          type: string
 *          description: The current status of the reservation.
 * 
 * tags:
 *  name: Reservations
 *  description: API to manage reservations
 * 
 * /reservations:
 *  get:
 *    summary: Retrieves a list of reservations.
 *    tags: [Reservations]
 *    requestBody:
 *      required: false
 *    responses:
 *      "200":
 *        description: Array of reservations.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Reservation"
 * 
 *  post:
 *    summary: Creates a new reservation.
 *    tags: [Reservations]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Reservation"
 *    responses:
 *      "201":
 *        description: The created reservation.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Reservation"
 * 
 * /reservations/:reservation_id:
 *  get:
 *    summary: Retrieves a reservation by id.
 *    tags: [Reservations]
 *    requestBody:
 *      required: false
 *    responses:
 *      "200":
 *        description: The reservation with the matching id.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Reservation"
 * 
 *  put:
 *    summary: Updates a reservation.
 *    tags: [Reservations]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Reservation"
 *    responses:
 *      "200":
 *        description: The updated reservation.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Reservation"
 * 
 * /reservations/:reservation_id/status:
 *  put:
 *    summary: Updates a reservation's status.
 *    tags: [Reservations]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Reservation"
 *    responses:
 *      "200":
 *        description: The reservation with the updated status.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Reservation"
 */
router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);
router.route("/:reservation_id").get(controller.read).put(controller.update).all(methodNotAllowed);
router.route("/:reservation_id/status").put(controller.updateStatus).all(methodNotAllowed);


module.exports = router;
