import Board, { IBoard } from "../models/board.model";

export interface IBoardService {
    createBoard(board: IBoard): Promise<IBoard>;
    findBoardById(id: string): Promise<IBoard | null>;
    findAllBoards(): Promise<IBoard[]>;
    updateBoard(id: string, board: IBoard): Promise<IBoard | null>;
    deleteBoard(id: string): Promise<IBoard | null>;
}

export class BoardService implements IBoardService {
    constructor(private readonly boardModel: typeof Board) {}
    
    public async createBoard(board: IBoard): Promise<IBoard> {
        try {
            return await this.boardModel.create(board);
        } catch (error: any) {
            throw new Error(`Creation failed: ${error.message}`);
        }
    }

    public async findBoardById(id: string): Promise<IBoard | null> {
        try {
            const board = await this.boardModel.findById(id);
            if (!board) {
                throw new Error("Board not found");
            }
            return board;
        } catch (error: any) {
            throw new Error(`Finding board by ID failed: ${error.message}`);
        }
    }

    public async findAllBoards(): Promise<IBoard[]> {
        try {
            return await this.boardModel.find();
        } catch (error: any) {
            throw new Error(`Finding all boards failed: ${error.message}`);
        }
    }

    public async updateBoard(id: string, board: IBoard): Promise<IBoard | null> {
        try {
            const updatedBoard = await this.boardModel.findByIdAndUpdate(id, board, { new: true });
            if (!updatedBoard) {
                throw new Error("Board not found");
            }
            return updatedBoard;
        } catch (error: any) {
            throw new Error(`Updating board failed: ${error.message}`);
        }
    }

    public async deleteBoard(id: string): Promise<IBoard | null> {
        try {
            const deletedBoard = await this.boardModel.findByIdAndDelete(id);
            if (!deletedBoard) {
                throw new Error("Board not found");
            }
            return deletedBoard;
        } catch (error: any) {
            throw new Error(`Deleting board failed: ${error.message}`);
        }
    }
}
