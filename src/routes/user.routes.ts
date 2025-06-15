import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import User from "../models/user.model";

const router = Router();
const userController = new UserController(new UserService(User));

router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/:id", userController.findUserById);
router.get("/", userController.findAllUsers);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
                        
export default router;
