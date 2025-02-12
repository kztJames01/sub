import { Router } from "express";

const subRouter = Router();

subRouter.get("/", (req, res) => res.send({ title: "GET All Sub"}));
subRouter.get("/:id", (req, res) => res.send({ title: "GET Sub Details"}));
subRouter.post("/", (req, res) => res.send({ title: "Create Sub"}));
subRouter.put("/:id", (req, res) => res.send({ title: "Update Sub"}));
subRouter.delete("/:id", (req, res) => res.send({ title: "Delete Sub"}));

subRouter.get("/user/:id", (req, res) => res.send({ title: "Get Sub of User"}));
subRouter.delete("/user/:id", (req, res) => res.send({ title: "Cancel Sub"}));
subRouter.get("/upcoming-renewals", (req, res) => res.send({ title: "Get All Upcoming Renewals"}));


export default subRouter;