import { Router } from "express";
import { BoardController } from "../controllers/board.controller";
import { BoardService } from "../services/board.service";
import Board from "../models/board.model";

const router = Router();
const boardController = new BoardController(new BoardService(Board));

router.post("/", boardController.createBoard);

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create a new board
 *     description: Create a new board with name and description
 *     tags: [Boards]
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
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: Board name
 *                 example: Project Management
 *               description:
 *                 type: string
 *                 description: Board description
 *                 example: Main board for project management tasks
 *               collaborators:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of collaborator IDs
 *                 example: ["648e2f3a1234567890abcdef", "648e2f3a1234567890abcdef"]
 *     responses:
 *       201:
 *         description: Board created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Board ID
 *                   example: 648e2f3a1234567890abcdef
 *                 name:
 *                   type: string
 *                   description: Board name
 *                   example: Project Management
 *                 description:
 *                   type: string
 *                   description: Board description
 *                   example: Main board for project management tasks
 *                 collaborators:
 *                   type: array
 *                   items:
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

router.get("/:id", boardController.findBoardById);

/**
 * @swagger
 * /boards/{id}:
 *   get:
 *     summary: Get board by ID
 *     description: Retrieve a board by its ID
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Board ID
 *     responses:
 *       200:
 *         description: Board retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Board ID
 *                   example: 648e2f3a1234567890abcdef
 *                 name:
 *                   type: string
 *                   description: Board name
 *                   example: Project Management
 *                 description:
 *                   type: string
 *                   description: Board description
 *                   example: Main board for project management tasks
 *                 collaborators:
 *                   type: array
 *                   items:
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
 *         description: Board not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Board not found
 */

router.get("/", boardController.findAllBoards);

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all boards
 *     description: Retrieve all boards
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Boards retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Board ID
 *                     example: 648e2f3a1234567890abcdef
 *                   name:
 *                     type: string
 *                     description: Board name
 *                     example: Project Management
 *                   description:
 *                     type: string
 *                     description: Board description
 *                     example: Main board for project management tasks
 *                   collaborators:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 648e2f3a1234567890abcdef
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         email:
 *                           type: string
 *                           example: john.doe@example.com
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

router.put("/:id", boardController.updateBoard);

/**
 * @swagger
 * /boards/{id}:
 *   put:
 *     summary: Update board
 *     description: Update a board's information
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Board ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Board name
 *                 example: Project Management
 *               description:
 *                 type: string
 *                 description: Board description
 *                 example: Main board for project management tasks
 *               collaborators:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of collaborator IDs
 *                 example: ["648e2f3a1234567890abcdef", "648e2f3a1234567890abcdef"]
 *     responses:
 *       200:
 *         description: Board updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Board ID
 *                   example: 648e2f3a1234567890abcdef
 *                 name:
 *                   type: string
 *                   description: Board name
 *                   example: Project Management
 *                 description:
 *                   type: string
 *                   description: Board description
 *                   example: Main board for project management tasks
 *                 collaborators:
 *                   type: array
 *                   items:
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
 *         description: Board not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Board not found
 */

router.delete("/:id", boardController.deleteBoard);

/**
 * @swagger
 * /boards/{id}:
 *   delete:
 *     summary: Delete board
 *     description: Delete a board by its ID
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Board ID
 *     responses:
 *       200:
 *         description: Board deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Board ID
 *                   example: 648e2f3a1234567890abcdef
 *                 name:
 *                   type: string
 *                   description: Board name
 *                   example: Project Management
 *                 description:
 *                   type: string
 *                   description: Board description
 *                   example: Main board for project management tasks
 *                 collaborators:
 *                   type: array
 *                   items:
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
 *         description: Board not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Board not found
 */
                        
export default router;
