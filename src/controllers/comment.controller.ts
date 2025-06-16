import { Request, Response } from "express";
import { ICommentService } from "../services/comment.service";

export interface ICommentController {
    createComment(req: Request, res: Response): Promise<void>;
    findCommentById(req: Request, res: Response): Promise<void>;
    findAllComments(req: Request, res: Response): Promise<void>;
    updateComment(req: Request, res: Response): Promise<void>;
    deleteComment(req: Request, res: Response): Promise<void>;
}

export class CommentController implements ICommentController {
    constructor(private readonly commentService: ICommentService) {}

    createComment = async (req: Request, res: Response): Promise<void> => {
        try {
            const comment = await this.commentService.createComment(req.body);
            res.status(201).json(comment);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    findCommentById = async (req: Request, res: Response): Promise<void> => {
        try {
            const comment = await this.commentService.findCommentById(req.params.id);
            res.status(200).json(comment);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    findAllComments = async (req: Request, res: Response): Promise<void> => {
        try {
            const comments = await this.commentService.findAllComments();
            res.status(200).json(comments);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    updateComment = async (req: Request, res: Response): Promise<void> => {
        try {
            const comment = await this.commentService.updateComment(req.params.id, req.body);
            res.status(200).json(comment);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    deleteComment = async (req: Request, res: Response): Promise<void> => {
        try {
            const comment = await this.commentService.deleteComment(req.params.id);
            res.status(200).json(comment);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}