import { IComment, ICommentResponse } from "../interfaces/comment.interface";
import Comment from "../models/comment.model";

export interface ICommentService {
    createComment(comment: IComment): Promise<ICommentResponse>;
    findCommentById(id: string): Promise<ICommentResponse | null>;
    findAllComments(): Promise<ICommentResponse[]>;
    updateComment(id: string, comment: IComment): Promise<ICommentResponse | null>;
    deleteComment(id: string): Promise<ICommentResponse | null>;
}

export class CommentService implements ICommentService {
    constructor(private readonly commentModel: typeof Comment) {}

    createComment = async (comment: IComment): Promise<ICommentResponse> => {
        try {
            const newComment = await this.commentModel.create(comment);
            return {
                id: newComment._id,
                content: newComment.content,
                user: newComment.user,
                task: newComment.task,
            };
        } catch (error: any) {
            throw new Error(`Creation failed: ${error.message}`);
        }
    }

    findCommentById = async (id: string): Promise<ICommentResponse | null> => {
        try {
            const comment = await this.commentModel.findById(id).populate("user", "name").populate("task", "name");
            if (!comment) {
                throw new Error("Comment not found");
            }
            return {
                id: comment._id,
                content: comment.content,
                user: comment.user,
                task: comment.task,
            };
        } catch (error: any) {
            throw new Error(`Finding comment by ID failed: ${error.message}`);
        }
    }

    findAllComments = async (): Promise<ICommentResponse[]> => {
        try {
            const comments = await this.commentModel.find().populate("user", "name").populate("task", "name");
            return comments.map((comment: IComment) => ({
                id: comment._id,
                content: comment.content,
                user: comment.user,
                task: comment.task,
            })) as ICommentResponse[];
        } catch (error: any) {
            throw new Error(`Finding all comments failed: ${error.message}`);
        }
    }

    updateComment = async (id: string, comment: IComment): Promise<ICommentResponse | null> => {
        try {
            const updatedComment = await this.commentModel.findByIdAndUpdate(id, comment, { new: true }).populate("user", "name").populate("task", "name");
            if (!updatedComment) {
                throw new Error("Comment not found");
            }
            return {
                id: updatedComment._id,
                content: updatedComment.content,
                user: updatedComment.user,
                task: updatedComment.task,
            };
        } catch (error: any) {
            throw new Error(`Updating comment failed: ${error.message}`);
        }
    }

    deleteComment = async (id: string): Promise<ICommentResponse | null> => {
        try {
            const deletedComment = await this.commentModel.findByIdAndDelete(id).populate("user", "name").populate("task", "name");
            if (!deletedComment) {
                throw new Error("Comment not found");
            }
            return {
                id: deletedComment._id,
                content: deletedComment.content,
                user: deletedComment.user,
                task: deletedComment.task,
            };
        } catch (error: any) {
            throw new Error(`Deleting comment failed: ${error.message}`);
        }
    }
}