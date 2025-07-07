import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

// ✅ CORS must be exact
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// ✅ Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// ✅ Route imports
import userRouter from "./routes/user.route.js";
import locationRouter from "./routes/location.route.js";

// ✅ Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/location", locationRouter);

export { app };
