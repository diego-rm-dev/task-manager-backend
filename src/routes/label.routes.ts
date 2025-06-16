import { Router } from "express";
import { LabelController } from "../controllers/label.controller";
import { LabelService } from "../services/label.service";
import Label from "../models/label.model";

const router = Router();
const labelController = new LabelController(new LabelService(Label));

router.post("/", labelController.createLabel);

/**
 * @swagger
 * /labels:
 *   post:
 *     summary: Create a new label
 *     description: Create a new label with name, color, and optional description
 *     tags: [Labels]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - color
 *             properties:
 *               name:
 *                 type: string
 *                 description: Label name
 *                 example: Bug
 *               color:
 *                 type: string
 *                 format: hex
 *                 description: Label color in hex format
 *                 example: #FF0000
 *               description:
 *                 type: string
 *                 description: Label description
 *                 example: Used for marking bugs
 *               boardId:
 *                 type: string
 *                 description: Board ID to associate with
 *                 example: 648e2f3a1234567890abcdef
 *     responses:
 *       201:
 *         description: Label created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Label ID
 *                   example: 648e2f3a1234567890abcdef
 *                 name:
 *                   type: string
 *                   description: Label name
 *                   example: Bug
 *                 color:
 *                   type: string
 *                   format: hex
 *                   description: Label color
 *                   example: #FF0000
 *                 description:
 *                   type: string
 *                   description: Label description
 *                   example: Used for marking bugs
 *                 boardId:
 *                   type: string
 *                   description: Associated board ID
 *                   example: 648e2f3a1234567890abcdef
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Creation timestamp
 *                   example: 2025-06-16T05:37:30.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last update timestamp
 *                   example: 2025-06-16T05:37:30.000Z
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Validation failed
 */

router.get("/:id", labelController.findLabelById);

/**
 * @swagger
 * /labels/{id}:
 *   get:
 *     summary: Get label by ID
 *     description: Retrieve a label by its ID
 *     tags: [Labels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Label ID
 *     responses:
 *       200:
 *         description: Label retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Label ID
 *                   example: 648e2f3a1234567890abcdef
 *                 name:
 *                   type: string
 *                   description: Label name
 *                   example: Bug
 *                 color:
 *                   type: string
 *                   format: hex
 *                   description: Label color
 *                   example: #FF0000
 *                 description:
 *                   type: string
 *                   description: Label description
 *                   example: Used for marking bugs
 *                 boardId:
 *                   type: string
 *                   description: Associated board ID
 *                   example: 648e2f3a1234567890abcdef
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 648e2f3a1234567890abcdef
 *                       title:
 *                         type: string
 *                         example: Fix login issue
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Creation timestamp
 *                   example: 2025-06-16T05:37:30.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last update timestamp
 *                   example: 2025-06-16T05:37:30.000Z
 *       404:
 *         description: Label not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Label not found
 */

router.get("/", labelController.findAllLabels);

/**
 * @swagger
 * /labels:
 *   get:
 *     summary: Get all labels
 *     description: Retrieve all labels
 *     tags: [Labels]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Labels retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Label ID
 *                     example: 648e2f3a1234567890abcdef
 *                   name:
 *                     type: string
 *                     description: Label name
 *                     example: Bug
 *                   color:
 *                     type: string
 *                     format: hex
 *                     description: Label color
 *                     example: #FF0000
 *                   description:
 *                     type: string
 *                     description: Label description
 *                     example: Used for marking bugs
 *                   boardId:
 *                     type: string
 *                     description: Associated board ID
 *                     example: 648e2f3a1234567890abcdef
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Creation timestamp
 *                     example: 2025-06-16T05:37:30.000Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Last update timestamp
 *                     example: 2025-06-16T05:37:30.000Z
 */

router.put("/:id", labelController.updateLabel);

/**
 * @swagger
 * /labels/{id}:
 *   put:
 *     summary: Update label
 *     description: Update a label's information
 *     tags: [Labels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Label ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Label name
 *                 example: Bug
 *               color:
 *                 type: string
 *                 format: hex
 *                 description: Label color
 *                 example: #FF0000
 *               description:
 *                 type: string
 *                 description: Label description
 *                 example: Used for marking bugs
 *               boardId:
 *                 type: string
 *                 description: Board ID
 *                 example: 648e2f3a1234567890abcdef
 *     responses:
 *       200:
 *         description: Label updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Label ID
 *                   example: 648e2f3a1234567890abcdef
 *                 name:
 *                   type: string
 *                   description: Label name
 *                   example: Bug
 *                 color:
 *                   type: string
 *                   format: hex
 *                   description: Label color
 *                   example: #FF0000
 *                 description:
 *                   type: string
 *                   description: Label description
 *                   example: Used for marking bugs
 *                 boardId:
 *                   type: string
 *                   description: Associated board ID
 *                   example: 648e2f3a1234567890abcdef
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 648e2f3a1234567890abcdef
 *                       title:
 *                         type: string
 *                         example: Fix login issue
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Creation timestamp
 *                   example: 2025-06-16T05:37:30.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last update timestamp
 *                   example: 2025-06-16T05:37:30.000Z
 *       404:
 *         description: Label not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Label not found
 */

router.delete("/:id", labelController.deleteLabel);

/**
 * @swagger
 * /labels/{id}:
 *   delete:
 *     summary: Delete label
 *     description: Delete a label by its ID
 *     tags: [Labels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Label ID
 *     responses:
 *       200:
 *         description: Label deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Label ID
 *                   example: 648e2f3a1234567890abcdef
 *                 name:
 *                   type: string
 *                   description: Label name
 *                   example: Bug
 *                 color:
 *                   type: string
 *                   format: hex
 *                   description: Label color
 *                   example: #FF0000
 *                 description:
 *                   type: string
 *                   description: Label description
 *                   example: Used for marking bugs
 *                 boardId:
 *                   type: string
 *                   description: Associated board ID
 *                   example: 648e2f3a1234567890abcdef
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 648e2f3a1234567890abcdef
 *                       title:
 *                         type: string
 *                         example: Fix login issue
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Creation timestamp
 *                   example: 2025-06-16T05:37:30.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last update timestamp
 *                   example: 2025-06-16T05:37:30.000Z
 *       404:
 *         description: Label not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Label not found
 */
                        
export default router;
