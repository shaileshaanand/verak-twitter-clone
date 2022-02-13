const app = require("./app");
const connectDB = require("./db/connect");

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
