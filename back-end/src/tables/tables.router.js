/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    Table:
 *      type: object
 *      required:
 *        - table_name
 *        - capacity
 *        - status
 *      properties:
 *        table_id:
 *          type: integer
 *          description: The auto-generated id of the table.
 *        table_name:
 *          type: string
 *          description: The name of the table.
 *        capacity:
 *          type: integer
 *          description: The maximum capacity of people of the table.
 *        status:
 *          type: string
 *          description: The current seating status of the table.
 *        reservation_id:
 *          type: integer
 *          description: The reservation currently being seated at the table.
 * 
 * tags:
 *  name: Tables
 *  description: API to manage tables
 * 
 * /tables:
 *  get:
 *    summary: Retrieves a list of tables.
 *    tags: [Tables]
 *    requestBody:
 *      required: false
 *    responses:
 *      "200":
 *        description: Array of tables.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Table"
 * 
 *  post:
 *    summary: Creates a new table.
 *    tags: [Tables]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Table"
 *    responses: 
 *      "201":
 *        description: The created table.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Table"
 * 
 * /tables/:table_id/seat:
 *  put:
 *    summary: Updates a table.
 *    tags: [Tables]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Table"
 *    responses:
 *      "200":
 *        description: The updated table.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Table"
 * 
 *  delete:
 *    summary: Finishes the current table's reservation.
 *    tags: [Tables]
 *    requestBody:
 *      required: false
 *    responses:
 *      "200":
 *        description: The table with now status as free.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Table"
 *        
 */
const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);
router.route("/:table_id/seat").put(controller.update).delete(controller.finish).all(methodNotAllowed);

module.exports = router;
