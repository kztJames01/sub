import { Router } from "../node_modules/express/index.js";
import { getUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middlware.js";
const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize,getUser);
userRouter.put("/:id", authorize, updateUser);
userRouter.delete("/:id", authorize, deleteUser);
export default userRouter