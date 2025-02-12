import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import errorMiddleware from "./middleware/error.middleware.js";
import connectToDatabase from "./database/mongodb.js";
import subRouter from "./routes/sub.routers.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";  

const app = express();

// Connect to MongoDB first
(async () => {
  await connectToDatabase();
  
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(morgan("dev"));

  // Routes
  app.use("/api/v1/subs", subRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);

  // Error handling
  app.use(errorMiddleware);

  app.get("/", (req, res) => {
      res.send("Hello World!");
  });

  const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
      console.log('UNHANDLED REJECTION! Shutting down...');
      console.log(err.name, err.message);
      server.close(() => {
          process.exit(1);
      });
  });
})();

export default app;