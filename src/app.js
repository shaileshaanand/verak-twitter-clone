const express = require("express");
require("dotenv").config();

const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const meRouter = require("./routes/me");
const postRouter = require("./routes/post");

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

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT } = process.env;

const connectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;

const start = async () => {
  try {
    console.log("Connecting to database...");
    await connectDB(connectionString);
    console.log("Connected...");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
