import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware.js";
import connectToDatabase from "./database/mongodb.js";
import subRouter from "./routes/sub.routers.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import workflowRouter from "./routes/workflow.routes.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import cors from "cors";

const app = express();

(async () => {
  await connectToDatabase()

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(arcjetMiddleware);

  // Middleware
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(arcjetMiddleware);

  // Routes
  app.use("/api/v1/subs", subRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/workflows", workflowRouter);

  // Error handling
  app.use(errorMiddleware);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! Shutting down...");
    console.error(err);
    server.close(() => {
      process.exit(1);
    });
  });


  process.on("SIGTERM", () => {
    console.log("SIGTERM received. Closing server...");
    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });
  });
})();

export default app;