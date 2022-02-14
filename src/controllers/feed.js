const { StatusCodes } = require("http-status-codes");
const Post = require("../models/Post");

const feed = async (req, res) => {
  const { following } = req.user;
  const sortByLikes = req.query.sortByLikes === "true" ? true : false;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  Post.aggregate(
    [
      {
        $project: {
          title: 1,
          content: 1,
          created: 1,
          author: 1,
          likes: 1,
          createdAt: 1,
          updatedAt: 1,
          _id: 1,
          length: { $size: "$likes" },
        },
      },
      {
        $match: {
          author: { $in: following },
        },
      },
      {
        $sort: sortByLikes ? { length: -1, createdAt: -1 } : { createdAt: -1 },
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ],
    (err, results) => {
      if (err) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Something went wrong" });
      }
      res.status(StatusCodes.OK).json({ results });
    }
  );
};

module.exports = { feed };
