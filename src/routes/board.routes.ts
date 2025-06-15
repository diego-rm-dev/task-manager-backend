import { Router } from "express";
import { BoardController } from "../controllers/board.controller";
import { BoardService } from "../services/board.service";
import Board from "../models/board.model";

const router = Router();
const boardController = new BoardController(new BoardService(Board));

router.post("/", boardController.createBoard);
router.get("/:id", boardController.findBoardById);
router.get("/", boardController.findAllBoards);
router.put("/:id", boardController.updateBoard);
router.delete("/:id", boardController.deleteBoard);
                        
export default router;
    