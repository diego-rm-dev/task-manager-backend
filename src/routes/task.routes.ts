import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { TaskService } from "../services/task.service";
import Task from "../models/task.model";

const router = Router();
const taskController = new TaskController(new TaskService(Task));

router.post("/", taskController.createTask);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task with title, description, and other details
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - status
 *               - boardId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Task title
 *                 example: Fix login issue
 *               description:
 *                 type: string
 *                 description: Task description
 *                 example: The login page is not working properly
 *               status:
 *                 type: string
 *                 enum: ["todo", "in_progress", "done"]
 *                 description: Task status
 *                 example: todo
 *               boardId:
 *                 type: string
 *                 description: Associated board ID
 *                 example: 648e2f3a1234567890abcdef
 *               priority:
 *                 type: string
 *                 enum: ["low", "medium", "high"]
 *                 description: Task priority
 *                 example: high
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Task due date
 *                 example: 2025-06-20
 *               labels:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of label IDs
 *                 example: ["648e2f3a1234567890abcdef", "648e2f3a1234567890abcdef"]
 *               assignees:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of assignee IDs
 *                 example: ["648e2f3a1234567890abcdef", "648e2f3a1234567890abcdef"]
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Task ID
 *                   example: 648e2f3a1234567890abcdef
 *                 title:
 *                   type: string
 *                   description: Task title
 *                   example: Fix login issue
 *                 description:
 *                   type: string
 *                   description: Task description
 *                   example: The login page is not working properly
 *                 status:
 *                   type: string
 *                   enum: ["todo", "in_progress", "done"]
 *                   description: Task status
 *                   example: todo
 *                 boardId:
 *                   type: string
 *                   description: Associated board ID
 *                   example: 648e2f3a1234567890abcdef
 *                 priority:
 *                   type: string
 *                   enum: ["low", "medium", "high"]
 *                   description: Task priority
 *                   example: high
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                   description: Task due date
 *                   example: 2025-06-20
 *                 labels:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 648e2f3a1234567890abcdef
 *                       name:
 *                         type: string
 *                         example: Bug
 *                       color:
 *                         type: string
 *                         format: hex
 *                         example: #FF0000
 *                 assignees:
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

router.get("/:id", taskController.findTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     description: Retrieve a task by its ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Task ID
 *                   example: 648e2f3a1234567890abcdef
 *                 title:
 *                   type: string
 *                   description: Task title
 *                   example: Fix login issue
 *                 description:
 *                   type: string
 *                   description: Task description
 *                   example: The login page is not working properly
 *                 status:
 *                   type: string
 *                   enum: ["todo", "in_progress", "done"]
 *                   description: Task status
 *                   example: todo
 *                 boardId:
 *                   type: string
 *                   description: Associated board ID
 *                   example: 648e2f3a1234567890abcdef
 *                 priority:
 *                   type: string
 *                   enum: ["low", "medium", "high"]
 *                   description: Task priority
 *                   example: high
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                   description: Task due date
 *                   example: 2025-06-20
 *                 labels:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 648e2f3a1234567890abcdef
 *                       name:
 *                         type: string
 *                         example: Bug
 *                       color:
 *                         type: string
 *                         format: hex
 *                         example: #FF0000
 *                 assignees:
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
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Task not found
 */

router.get("/", taskController.findAllTasks);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Task ID
 *                     example: 648e2f3a1234567890abcdef
 *                   title:
 *                     type: string
 *                     description: Task title
 *                     example: Fix login issue
 *                   description:
 *                     type: string
 *                     description: Task description
 *                     example: The login page is not working properly
 *                   status:
 *                     type: string
 *                     enum: ["todo", "in_progress", "done"]
 *                     description: Task status
 *                     example: todo
 *                   boardId:
 *                     type: string
 *                     description: Associated board ID
 *                     example: 648e2f3a1234567890abcdef
 *                   priority:
 *                     type: string
 *                     enum: ["low", "medium", "high"]
 *                     description: Task priority
 *                     example: high
 *                   dueDate:
 *                     type: string
 *                     format: date
 *                     description: Task due date
 *                     example: 2025-06-20
 *                   labels:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 648e2f3a1234567890abcdef
 *                         name:
 *                           type: string
 *                           example: Bug
 *                         color:
 *                           type: string
 *                           format: hex
 *                           example: #FF0000
 *                   assignees:
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

router.put("/:id", taskController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task
 *     description: Update a task's information
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Task title
 *                 example: Fix login issue
 *               description:
 *                 type: string
 *                 description: Task description
 *                 example: The login page is not working properly
 *               status:
 *                 type: string
 *                 enum: ["todo", "in_progress", "done"]
 *                 description: Task status
 *                 example: in_progress
 *               priority:
 *                 type: string
 *                 enum: ["low", "medium", "high"]
 *                 description: Task priority
 *                 example: high
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Task due date
 *                 example: 2025-06-20
 *               labels:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of label IDs
 *                 example: ["648e2f3a1234567890abcdef", "648e2f3a1234567890abcdef"]
 *               assignees:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of assignee IDs
 *                 example: ["648e2f3a1234567890abcdef", "648e2f3a1234567890abcdef"]
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Task ID
 *                   example: 648e2f3a1234567890abcdef
 *                 title:
 *                   type: string
 *                   description: Task title
 *                   example: Fix login issue
 *                 description:
 *                   type: string
 *                   description: Task description
 *                   example: The login page is not working properly
 *                 status:
 *                   type: string
 *                   enum: ["todo", "in_progress", "done"]
 *                   description: Task status
 *                   example: in_progress
 *                 boardId:
 *                   type: string
 *                   description: Associated board ID
 *                   example: 648e2f3a1234567890abcdef
 *                 priority:
 *                   type: string
 *                   enum: ["low", "medium", "high"]
 *                   description: Task priority
 *                   example: high
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                   description: Task due date
 *                   example: 2025-06-20
 *                 labels:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 648e2f3a1234567890abcdef
 *                       name:
 *                         type: string
 *                         example: Bug
 *                       color:
 *                         type: string
 *                         format: hex
 *                         example: #FF0000
 *                 assignees:
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
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Task not found
 */

router.delete("/:id", taskController.deleteTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     description: Delete a task by its ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Task ID
 *                   example: 648e2f3a1234567890abcdef
 *                 title:
 *                   type: string
 *                   description: Task title
 *                   example: Fix login issue
 *                 description:
 *                   type: string
 *                   description: Task description
 *                   example: The login page is not working properly
 *                 status:
 *                   type: string
 *                   enum: ["todo", "in_progress", "done"]
 *                   description: Task status
 *                   example: todo
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
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Task not found
 */
                        
export default router;