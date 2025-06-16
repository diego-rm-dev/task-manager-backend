import { Router } from "express";
import { CommentService } from "../services/comment.service";
import Comment from "../models/comment.model";
import { CommentController } from "../controllers/comment.controller";
import { post, get, put, deleteMethod } from "../decorators/swagger.decorator";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const commentController = new CommentController(new CommentService(Comment));

router.post("/", commentController.createComment);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     description: Create a new comment for a task
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - taskId
 *               - userId
 *             properties:
 *               content:
 *                 type: string
 *                 description: Comment content
 *                 example: This is a test comment
 *               taskId:
 *                 type: string
 *                 description: Associated task ID
 *                 example: 648e2f3a1234567890abcdef
 *               userId:
 *                 type: string
 *                 description: Comment author ID
 *                 example: 648e2f3a1234567890abcdef
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Comment ID
 *                   example: 648e2f3a1234567890abcdef
 *                 content:
 *                   type: string
 *                   description: Comment content
 *                   example: This is a test comment
 *                 taskId:
 *                   type: string
 *                   description: Associated task ID
 *                   example: 648e2f3a1234567890abcdef
 *                 userId:
 *                   type: string
 *                   description: Comment author ID
 *                   example: 648e2f3a1234567890abcdef
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

router.get("/:id", commentController.findCommentById);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get comment by ID
 *     description: Retrieve a comment by its ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Comment ID
 *                   example: 648e2f3a1234567890abcdef
 *                 content:
 *                   type: string
 *                   description: Comment content
 *                   example: This is a test comment
 *                 taskId:
 *                   type: string
 *                   description: Associated task ID
 *                   example: 648e2f3a1234567890abcdef
 *                 userId:
 *                   type: string
 *                   description: Comment author ID
 *                   example: 648e2f3a1234567890abcdef
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
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Comment not found
 */

router.get("/", commentController.findAllComments);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     description: Retrieve all comments
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Comment ID
 *                     example: 648e2f3a1234567890abcdef
 *                   content:
 *                     type: string
 *                     description: Comment content
 *                     example: This is a test comment
 *                   taskId:
 *                     type: string
 *                     description: Associated task ID
 *                     example: 648e2f3a1234567890abcdef
 *                   userId:
 *                     type: string
 *                     description: Comment author ID
 *                     example: 648e2f3a1234567890abcdef
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

router.put("/:id", commentController.updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update comment
 *     description: Update a comment's content
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Updated comment content
 *                 example: Updated comment content
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Comment ID
 *                   example: 648e2f3a1234567890abcdef
 *                 content:
 *                   type: string
 *                   description: Updated comment content
 *                   example: Updated comment content
 *                 taskId:
 *                   type: string
 *                   description: Associated task ID
 *                   example: 648e2f3a1234567890abcdef
 *                 userId:
 *                   type: string
 *                   description: Comment author ID
 *                   example: 648e2f3a1234567890abcdef
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
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Comment not found
 */

router.delete("/:id", commentController.deleteComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete comment
 *     description: Delete a comment by its ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Comment ID
 *                   example: 648e2f3a1234567890abcdef
 *                 content:
 *                   type: string
 *                   description: Comment content
 *                   example: This is a test comment
 *                 taskId:
 *                   type: string
 *                   description: Associated task ID
 *                   example: 648e2f3a1234567890abcdef
 *                 userId:
 *                   type: string
 *                   description: Comment author ID
 *                   example: 648e2f3a1234567890abcdef
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
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Comment not found
 */
                        
export default router;
