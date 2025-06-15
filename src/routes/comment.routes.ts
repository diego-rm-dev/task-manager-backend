import { Router } from "express";
import { CommentService } from "../services/comment.service";
import Comment from "../models/comment.model";
import { CommentController } from "../controllers/comment.controller";

const router = Router();
const commentController = new CommentController(new CommentService(Comment));

router.post("/", commentController.createComment);
router.get("/:id", commentController.findCommentById);
router.get("/", commentController.findAllComments);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);
                        
export default router;
