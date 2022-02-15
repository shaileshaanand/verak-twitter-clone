const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./db/connect");
const Post = require("./models/Post");
const User = require("./models/User");

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT } = process.env;

const connectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;

const main = async () => {
  try {
    console.log("Connecting to database...");
    await connectDB(connectionString);
    console.log("Connected...");
  } catch (error) {
    console.log(error);
  }

  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }

  const johndoe = await User.create({
    first_name: "John",
    last_name: "Doe",
    username: "johndoe",
    password: "SuperSecure123",
  });
  const maryjane = await User.create({
    first_name: "Mary",
    last_name: "Jane",
    username: "maryjane",
    password: "SuperSecure123",
  });
  const alicerocks = await User.create({
    first_name: "Alice",
    last_name: "rocks",
    username: "alicerocks",
    password: "SuperSecure123",
  });
  // johndoe.following.push(maryjane._id);
  // johndoe.following.push(alicerocks._id);
  // johndoe.save();
  await User.findByIdAndUpdate(johndoe._id, {
    $addToSet: { following: { $each: [alicerocks._id, maryjane._id] } },
  });

  // maryjane.followers.push(johndoe._id);
  // maryjane.save();
  await User.findByIdAndUpdate(maryjane._id, {
    $push: { followers: johndoe._id },
  });
  // alicerocks.followers.push(johndoe._id);
  // alicerocks.save();
  await User.findByIdAndUpdate(alicerocks._id, {
    $push: { followers: johndoe._id },
  });
  const posts = [
    await Post.create({
      author: maryjane._id,
      content: "First Post",
      title: "First Post By Mary!",
    }),
    await Post.create({
      author: maryjane._id,
      content: "Second Post",
      title: "Second Post By Mary!",
    }),
    await Post.create({
      author: alicerocks._id,
      content: "Third Post",
      title: "Alice Post By Alice!",
    }),
    await Post.create({
      author: maryjane._id,
      content: "Third Post",
      title: "Third Post By Mary!",
    }),
    await Post.create({
      author: johndoe._id,
      content: "First Post",
      title: "First Post By John!",
    }),
  ];

  // posts[0].likes.push(johndoe._id);
  // await posts[0].save();

  posts[1].likes.push(johndoe._id);
  posts[1].likes.push(alicerocks._id);
  posts[1].likes.push(maryjane._id);
  await posts[1].save();

  posts[2].likes.push(johndoe._id);
  posts[2].likes.push(maryjane._id);
  await posts[2].save();

  posts[3].likes.push(maryjane._id);
  await posts[3].save();
  posts[4].likes.push(alicerocks._id);
  await posts[4].save();
  mongoose.connection.close();
  console.log("Seed Data Successfully!");
};

main();
