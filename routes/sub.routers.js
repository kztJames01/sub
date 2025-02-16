import { Router } from "express";
import { createSub, getUserSubs, adminDeleteSub, getAdminSubs, cancelSub, updateSub, getUpcomingRenewals } from "../controllers/sub.controller.js";
import authorize from "../middleware/auth.middlware.js";
import adminOnly from "../middleware/admin.middleware.js";

const subRouter = Router();

// Admin routes
subRouter.get("/admin/subs", authorize, adminOnly, getAdminSubs);
subRouter.delete("/admin/subs/:id", authorize, adminOnly, adminDeleteSub);

// User routes
subRouter.post("/", authorize, createSub);
subRouter.get("/user/:id", authorize, getUserSubs);
subRouter.put("/:id", authorize, updateSub);
subRouter.delete("/:id", authorize, cancelSub);
subRouter.get("/upcoming-renewals", authorize, getUpcomingRenewals);

export default subRouter;