import express, { Application, Request, Response } from "express";
import connectDB from "./db/database.connect";

connectDB();

const app : Application = express();

app.get("/", (req: Request, res: Response): void => {
    res.send("Hello World! Welcome to the Task Manager Backend");
}); 

app.listen(3000, (): void => {
    console.log("Server is running on port 3000");
});
