const express = require("express");
require("dotenv").config();
require("express-async-errors");

const authRouter = require("./routes/auth");
const meRouter = require("./routes/me");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const feedRouter = require("./routes/feed");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authMiddleware = require("./middleware/authentication");

const app = express();

// const cors = require("cors");

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use(authMiddleware);
app.use("/api/v1/me", meRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/feed", feedRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
