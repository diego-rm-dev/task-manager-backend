import express, { Application, Request, Response } from "express";
import dotenv from 'dotenv';
import connectDB from "./db/database.connect";
import boardRouter from "./routes/board.routes";
import taskRouter from "./routes/task.routes";
import labelRouter from "./routes/label.routes";
import commentRouter from "./routes/comment.routes";
import collaboratorRouter from "./routes/collaborator.routes";
import userRouter from "./routes/user.routes";
import { authMiddleware } from "./middlewares/auth.middleware";
import { setupSwagger } from "./config/swagger.config";

dotenv.config();

connectDB();

const app : Application = express();

// Swagger documentation
setupSwagger(app);

app.use(express.json());

app.use("/api/boards", authMiddleware, boardRouter);
app.use("/api/tasks", authMiddleware, taskRouter);
app.use("/api/labels", authMiddleware, labelRouter);
app.use("/api/comments", authMiddleware, commentRouter);
app.use("/api/collaborators", authMiddleware, collaboratorRouter);
app.use("/api/users", userRouter);

app.get("/", (req: Request, res: Response): void => {
    res.send("Hello World! Welcome to the Task Manager Backend");
}); 

app.listen(3000, (): void => {
    console.log("Server is running on port 3000");
});
