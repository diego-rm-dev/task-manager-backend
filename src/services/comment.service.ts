import Comment, { IComment } from "../models/comment.model";

export interface ICommentService {
    createComment(comment: IComment): Promise<IComment>;
    findCommentById(id: string): Promise<IComment | null>;
    findAllComments(): Promise<IComment[]>;
    updateComment(id: string, comment: IComment): Promise<IComment | null>;
    deleteComment(id: string): Promise<IComment | null>;
}

export class CommentService implements ICommentService {
    constructor(private readonly commentModel: typeof Comment) {}

    public async createComment(comment: IComment): Promise<IComment> {
        try {
            return await this.commentModel.create(comment);
        } catch (error: any) {
            throw new Error(`Creation failed: ${error.message}`);
        }
    }

    public async findCommentById(id: string): Promise<IComment | null> {
        try {
            const comment = await this.commentModel.findById(id);
            if (!comment) {
                throw new Error("Comment not found");
            }
            return comment;
        } catch (error: any) {
            throw new Error(`Finding comment by ID failed: ${error.message}`);
        }
    }

    public async findAllComments(): Promise<IComment[]> {
        try {
            return await this.commentModel.find();
        } catch (error: any) {
            throw new Error(`Finding all comments failed: ${error.message}`);
        }
    }

    public async updateComment(id: string, comment: IComment): Promise<IComment | null> {
        try {
            const updatedComment = await this.commentModel.findByIdAndUpdate(id, comment, { new: true });
            if (!updatedComment) {
                throw new Error("Comment not found");
            }
            return updatedComment;
        } catch (error: any) {
            throw new Error(`Updating comment failed: ${error.message}`);
        }
    }

    public async deleteComment(id: string): Promise<IComment | null> {
        try {
            const deletedComment = await this.commentModel.findByIdAndDelete(id);
            if (!deletedComment) {
                throw new Error("Comment not found");
            }
            return deletedComment;
        } catch (error: any) {
            throw new Error(`Deleting comment failed: ${error.message}`);
        }
    }
}