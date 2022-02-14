const express = require("express");
const router = express.Router();
const {
  getPosts,
  newPost,
  likePost,
  deletePost,
  unlikePost,
} = require("../controllers/post");

const authMiddleware = require("../middleware/authentication");

router.get("", authMiddleware, getPosts);
router.post("", authMiddleware, newPost);
router.delete("/:id", authMiddleware, deletePost);
router.get("/:id/like", authMiddleware, likePost);
router.get("/:id/unlike", authMiddleware, unlikePost);

module.exports = router;
