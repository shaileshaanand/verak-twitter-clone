const Post = require("../models/Post");

const feed = async (req, res) => {
  const { following } = req.user;
  const sortByLikes = !!req.query.sortByLikes;
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  console.log({ sortByLikes });
  const posts = await Post.find({ author: { $in: following } })
    .sort(sortByLikes ? { likes: -1, createdAt: -1 } : { createdAt: -1 })
    .limit(limit)
    .skip((page - 1) * limit);
  res.status(200).json({ posts });
};
module.exports = { feed };
