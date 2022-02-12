const express = require("express");
const router = express.Router();
const {
  getPosts,
  newPost,
  likePost,
  deletePost,
  unlikePost,
} = require("../controllers/post");

router.get("", getPosts);
router.post("", newPost);
router.delete("/:id", deletePost);
router.get("/:id/like", likePost);
router.get("/:id/unlike", unlikePost);

module.exports = router;
