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
import cors from 'cors';
const app = express();

// Connect to MongoDB first
(async () => {
  await connectToDatabase();
  
  // Middleware
  app.use(cors({
    origin: "http://localhost:3001", // Allow requests from Next.js
    credentials: true, // If you plan to use cookies or auth headers
  }));
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