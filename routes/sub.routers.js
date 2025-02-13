import { Router } from "express";
import { createSub, getSubs, getUserSubs, getUpcomingRenewals, cancelSub, subDelete, updateSub } from "../controllers/sub.controller.js";
import { authorize ,adminOnly} from "../middleware/auth.middlware.js";


const subRouter = Router();

// Admin routes
subRouter.get("/admin/subs", authorize, adminOnly, getAllSubs);
subRouter.get("/admin/subs/:id", authorize, adminOnly, getSubDetails);

// User routes
subRouter.post("/", authorize, createSub);
subRouter.get("/user/:id", authorize, getUserSubs);
subRouter.put("/:id", authorize, (req, res) => res.send({ title: "Update Sub"}));
subRouter.delete("/:id", authorize, (req, res) => res.send({ title: "Delete Sub"}));
subRouter.delete("/user/:id", authorize, (req, res) => res.send({ title: "Cancel Sub"}));
subRouter.get("/upcoming-renewals", authorize, (req, res) => res.send({ title: "Get All Upcoming Renewals"}));

export default subRouter;