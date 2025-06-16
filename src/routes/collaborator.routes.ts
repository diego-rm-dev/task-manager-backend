import { Router } from "express";
import { CollaboratorController } from "../controllers/collaborator.controller";
import { CollaboratorService } from "../services/collaborator.service";
import Collaborator from "../models/collaborator.model";

const router = Router();
const collaboratorController = new CollaboratorController(new CollaboratorService(Collaborator));

router.post("/", collaboratorController.createCollaborator);

/**
 * @swagger
 * /collaborators:
 *   post:
 *     summary: Add a new collaborator to a board
 *     description: Add a new user as a collaborator to a board
 *     tags: [Collaborators]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - boardId
 *               - userId
 *             properties:
 *               boardId:
 *                 type: string
 *                 description: Board ID to add collaborator to
 *                 example: 648e2f3a1234567890abcdef
 *               userId:
 *                 type: string
 *                 description: User ID to add as collaborator
 *                 example: 648e2f3a1234567890abcdef
 *               role:
 *                 type: string
 *                 enum: ["member", "admin"]
 *                 description: Collaborator's role
 *                 example: member
 *     responses:
 *       201:
 *         description: Collaborator added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Collaborator ID
 *                   example: 648e2f3a1234567890abcdef
 *                 boardId:
 *                   type: string
 *                   description: Associated board ID
 *                   example: 648e2f3a1234567890abcdef
 *                 userId:
 *                   type: string
 *                   description: User ID
 *                   example: 648e2f3a1234567890abcdef
 *                 role:
 *                   type: string
 *                   enum: ["member", "admin"]
 *                   description: Collaborator's role
 *                   example: member
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 648e2f3a1234567890abcdef
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
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

router.get("/:id", collaboratorController.findCollaboratorById);

/**
 * @swagger
 * /collaborators/{id}:
 *   get:
 *     summary: Get collaborator by ID
 *     description: Retrieve a collaborator by their ID
 *     tags: [Collaborators]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Collaborator ID
 *     responses:
 *       200:
 *         description: Collaborator retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Collaborator ID
 *                   example: 648e2f3a1234567890abcdef
 *                 boardId:
 *                   type: string
 *                   description: Associated board ID
 *                   example: 648e2f3a1234567890abcdef
 *                 userId:
 *                   type: string
 *                   description: User ID
 *                   example: 648e2f3a1234567890abcdef
 *                 role:
 *                   type: string
 *                   enum: ["member", "admin"]
 *                   description: Collaborator's role
 *                   example: member
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 648e2f3a1234567890abcdef
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
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
 *         description: Collaborator not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Collaborator not found
 */

router.get("/", collaboratorController.findAllCollaborators);

/**
 * @swagger
 * /collaborators:
 *   get:
 *     summary: Get all collaborators
 *     description: Retrieve all collaborators
 *     tags: [Collaborators]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Collaborators retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Collaborator ID
 *                     example: 648e2f3a1234567890abcdef
 *                   boardId:
 *                     type: string
 *                     description: Associated board ID
 *                     example: 648e2f3a1234567890abcdef
 *                   userId:
 *                     type: string
 *                     description: User ID
 *                     example: 648e2f3a1234567890abcdef
 *                   role:
 *                     type: string
 *                     enum: ["member", "admin"]
 *                     description: Collaborator's role
 *                     example: member
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 648e2f3a1234567890abcdef
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: john.doe@example.com
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

router.put("/:id", collaboratorController.updateCollaborator);

/**
 * @swagger
 * /collaborators/{id}:
 *   put:
 *     summary: Update collaborator role
 *     description: Update a collaborator's role
 *     tags: [Collaborators]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Collaborator ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: ["member", "admin"]
 *                 description: New role for the collaborator
 *                 example: admin
 *     responses:
 *       200:
 *         description: Collaborator updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Collaborator ID
 *                   example: 648e2f3a1234567890abcdef
 *                 boardId:
 *                   type: string
 *                   description: Associated board ID
 *                   example: 648e2f3a1234567890abcdef
 *                 userId:
 *                   type: string
 *                   description: User ID
 *                   example: 648e2f3a1234567890abcdef
 *                 role:
 *                   type: string
 *                   enum: ["member", "admin"]
 *                   description: Updated role
 *                   example: admin
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 648e2f3a1234567890abcdef
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
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
 *         description: Collaborator not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Collaborator not found
 */

router.delete("/:id", collaboratorController.deleteCollaborator);

/**
 * @swagger
 * /collaborators/{id}:
 *   delete:
 *     summary: Remove collaborator from board
 *     description: Remove a collaborator from a board by their ID
 *     tags: [Collaborators]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Collaborator ID
 *     responses:
 *       200:
 *         description: Collaborator removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Collaborator ID
 *                   example: 648e2f3a1234567890abcdef
 *                 boardId:
 *                   type: string
 *                   description: Associated board ID
 *                   example: 648e2f3a1234567890abcdef
 *                 userId:
 *                   type: string
 *                   description: User ID
 *                   example: 648e2f3a1234567890abcdef
 *                 role:
 *                   type: string
 *                   enum: ["member", "admin"]
 *                   description: Collaborator's role
 *                   example: member
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 648e2f3a1234567890abcdef
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
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
 *         description: Collaborator not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Collaborator not found
 */
                        
export default router;
