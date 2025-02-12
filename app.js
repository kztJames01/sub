import express from "express";

import { PORT } from "./config/env.js";

import connectToDatabase from "./database/mongodb.js";
import subRouter from "./routes/sub.routers.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";  

const app = express();
app.use("/api/v1/subs", subRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT} http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;