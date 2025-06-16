import Board, { IBoard } from "../models/board.model";
import { IBoardResponse } from "../interfaces/board.interface";

export interface IBoardService {
    createBoard(board: IBoard): Promise<IBoardResponse>;
    findBoardById(id: string): Promise<IBoardResponse | null>;
    findAllBoards(): Promise<IBoardResponse[]>;
    updateBoard(id: string, board: IBoard): Promise<IBoardResponse | null>;
    deleteBoard(id: string): Promise<IBoardResponse | null>;
}

export class BoardService implements IBoardService {
    constructor(private readonly boardModel: typeof Board) {}
    
    createBoard = async (board: IBoard): Promise<IBoardResponse> => {
        try {
            const newBoard = await this.boardModel.create(board);
            return {
                name: newBoard.name,
                owner: newBoard.owner,
                description: newBoard.description,
                visibility: newBoard.visibility,
            };
        } catch (error: any) {
            throw new Error(`Creation failed: ${error.message}`);
        }
    }

    findBoardById = async (id: string): Promise<IBoardResponse | null> => {
        try {
            const board = await this.boardModel.findById(id).populate("owner", "name email");
            if (!board) {
                throw new Error("Board not found");
            }
            return {
                name: board.name,
                owner: board.owner,
                description: board.description,
                visibility: board.visibility,
            };
        } catch (error: any) {
            throw new Error(`Finding board by ID failed: ${error.message}`);
        }
    }

    findAllBoards = async (): Promise<IBoardResponse[]> => {
        try {
            return await this.boardModel.find().populate("owner", "name email");
        } catch (error: any) {
            throw new Error(`Finding all boards failed: ${error.message}`);
        }
    }

    updateBoard = async (id: string, board: IBoard): Promise<IBoardResponse | null> => {
        try {
            const updatedBoard = await this.boardModel.findByIdAndUpdate(id, board, { new: true }).populate("owner", "name email");
            if (!updatedBoard) {
                throw new Error("Board not found");
            }
            return {
                name: updatedBoard.name,
                owner: updatedBoard.owner,
                description: updatedBoard.description,
                visibility: updatedBoard.visibility,
            };
        } catch (error: any) {
            throw new Error(`Updating board failed: ${error.message}`);
        }
    }

    deleteBoard = async (id: string): Promise<IBoardResponse | null> => {
        try {
            const deletedBoard = await this.boardModel.findByIdAndDelete(id).populate("owner", "name email");
            if (!deletedBoard) {
                throw new Error("Board not found");
            }
            return {
                name: deletedBoard.name,
                owner: deletedBoard.owner,
                description: deletedBoard.description,
                visibility: deletedBoard.visibility,
            };
        } catch (error: any) {
            throw new Error(`Deleting board failed: ${error.message}`);
        }
    }
}
