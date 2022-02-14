const express = require("express");
const router = express.Router();
const { getUser, follow, unfollow } = require("../controllers/user");

const authMiddleware = require("../middleware/authentication");

router.get("/:id", authMiddleware, getUser);
router.get("/:id/follow", authMiddleware, follow);
router.get("/:id/unfollow", authMiddleware, unfollow);

module.exports = router;
