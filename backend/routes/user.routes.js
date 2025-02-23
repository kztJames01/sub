import { Router } from "express";
import { getUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middlware.js";
const userRouter = Router();

userRouter.get("/:id", authorize,getUser);
userRouter.put("/update/:id", authorize, updateUser);
userRouter.delete("/:id", authorize, deleteUser);
export default userRouter