import { Router } from "express";
import { createSub, getSub, getAllSubs, getSubDetails } from "../controllers/sub.controller.js";
import authorize from "../middleware/auth.middlware.js";
import isAdmin from "../middleware/admin.middleware.js";

const subRouter = Router();

// Admin routes
subRouter.get("/", authorize, isAdmin, getAllSubs);
subRouter.get("/:id", authorize, isAdmin, getSubDetails);

// User routes
subRouter.post("/", authorize, createSub);
subRouter.get("/user/:id", authorize, getSub);
subRouter.put("/:id", authorize, (req, res) => res.send({ title: "Update Sub"}));
subRouter.delete("/:id", authorize, (req, res) => res.send({ title: "Delete Sub"}));
subRouter.delete("/user/:id", authorize, (req, res) => res.send({ title: "Cancel Sub"}));
subRouter.get("/upcoming-renewals", authorize, (req, res) => res.send({ title: "Get All Upcoming Renewals"}));

export default subRouter;