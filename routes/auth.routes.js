import { Router } from "express";
import { signUp, signIn, signOut, adminSignIn } from "../controllers/auth.controller.js";
import { authorize ,adminOnly} from "../middleware/auth.middlware.js";


const authRouter = Router();

// Public routes
authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", authorize, signOut);

// Protected routes
authRouter.post("/admin/sign-in", authorize, adminOnly, adminSignIn);
authRouter.post("/admin/sign-out", authorize, adminOnly, signOut);

export default authRouter;