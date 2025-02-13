import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middlware.js";
const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize,getUser);
userRouter.post("/", authorize, (req, res) => res.send({ title: "Create User"}));
userRouter.put("/:id", authorize, (req, res) => res.send({ title: "Update User"}));
userRouter.delete("/:id", authorize, (req, res) => res.send({ title: "Delete User"}));

export default userRouter;