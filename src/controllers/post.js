const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const newPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user._id,
    });
    res.status(StatusCodes.CREATED).json({ post });
  } catch (err) {
    next(err);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ author: req.user._id });
    res.status(StatusCodes.OK).json({
      posts: posts,
    });
  } catch (err) {
    next(err);
  }
};

const likePost = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    { $addToSet: { likes: req.user._id } },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ post });
};
const unlikePost = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { likes: req.user._id } },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ post });
};

const deletePost = async (req, res) => {
  const post = await Post.findOneAndDelete({
    _id: req.params.id,
    author: req.user._id,
  });
  if (post) {
    res.status(StatusCodes.OK).json({ msg: "deleted" });
  } else {
    throw new BadRequestError("Post not found");
  }
};

module.exports = { getPosts, newPost, likePost, deletePost, unlikePost };
