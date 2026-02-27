import {
  showUsers,
  login,
  signup,
  deleteUser,
} from "../controllers/userController.js";
import express from "express"
const userRouter = express.Router()
userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.get("/",showUsers)
userRouter.delete("/:id",deleteUser)

export default userRouter

