import { Request, Response } from "express";
import { IBoardService } from "../services/board.service";

export interface IBoardController {
    createBoard(req: Request, res: Response): Promise<void>;
    findBoardById(req: Request, res: Response): Promise<void>;
    findAllBoards(req: Request, res: Response): Promise<void>;
    updateBoard(req: Request, res: Response): Promise<void>;
    deleteBoard(req: Request, res: Response): Promise<void>;
}             

export class BoardController implements IBoardController {
    constructor(private readonly boardService: IBoardService) {}

    public async createBoard(req: Request, res: Response): Promise<void> {
        try {
            const board = await this.boardService.createBoard(req.body);
            res.status(201).json(board);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async findBoardById(req: Request, res: Response): Promise<void> {
        try {
            const board = await this.boardService.findBoardById(req.params.id);
            res.status(200).json(board);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async findAllBoards(req: Request, res: Response): Promise<void> {
        try {
            const boards = await this.boardService.findAllBoards();
            res.status(200).json(boards);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async updateBoard(req: Request, res: Response): Promise<void> {
        try {
            const board = await this.boardService.updateBoard(req.params.id, req.body);
            res.status(200).json(board);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async deleteBoard(req: Request, res: Response): Promise<void> {
        try {
            const board = await this.boardService.deleteBoard(req.params.id);
            res.status(200).json(board);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}