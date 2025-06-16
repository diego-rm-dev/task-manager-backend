import { Request, Response } from "express";
import { IBoardService } from "../services/board.service";
import { ApiError } from "../errors/error.handler";

export interface IBoardController {
    createBoard(req: Request, res: Response): Promise<void>;
    findBoardById(req: Request, res: Response): Promise<void>;
    findAllBoards(req: Request, res: Response): Promise<void>;
    updateBoard(req: Request, res: Response): Promise<void>;
    deleteBoard(req: Request, res: Response): Promise<void>;
}             

export class BoardController implements IBoardController {
    constructor(private readonly boardService: IBoardService) {}

    createBoard = async (req: Request, res: Response): Promise<void> => {
        try {
            const board = await this.boardService.createBoard(req.body);
            res.status(201).json(board);
        } catch (error: any) {
            throw error;
        }
    }

    findBoardById = async (req: Request, res: Response): Promise<void> => {
        try {
            const board = await this.boardService.findBoardById(req.params.id);
            if (!board) {
                throw ApiError.notFound('Board not found');
            }
            res.status(200).json(board);
        } catch (error: any) {
            throw error;
        }
    }

    findAllBoards = async (req: Request, res: Response): Promise<void> => {
        try {
            const boards = await this.boardService.findAllBoards();
            res.status(200).json(boards);
        } catch (error: any) {
            throw error;
        }
    }

    updateBoard = async (req: Request, res: Response): Promise<void> => {
        try {
            const { title } = req.body;
            
            if (!title) {
                throw ApiError.badRequest('Missing required fields', 'Please provide title');
            }

            const board = await this.boardService.updateBoard(req.params.id, req.body);
            if (!board) {
                throw ApiError.notFound('Board not found');
            }
            res.status(200).json(board);
        } catch (error: any) {
            throw error;
        }
    }

    deleteBoard = async (req: Request, res: Response): Promise<void> => {
        try {
            const board = await this.boardService.deleteBoard(req.params.id);
            if (!board) {
                throw ApiError.notFound('Board not found');
            }
            res.status(200).json(board);
        } catch (error: any) {
            throw error;
        }
    }
}