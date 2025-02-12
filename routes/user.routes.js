import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", (req, res) => res.send({ title: "Create User"}));
userRouter.put("/:id", (req, res) => res.send({ title: "Update User"}));
userRouter.delete("/:id", (req, res) => res.send({ title: "Delete User"}));

export default userRouter;