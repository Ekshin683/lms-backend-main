import express from "express";
import dbConnect from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./routers/userRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const startServer = async () => {
  await dbConnect();
};
startServer()

app.use("/api/users", userRouter);

export default app;
