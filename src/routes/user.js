const express = require("express");
const router = express.Router();
const { getUser, follow, unfollow } = require("../controllers/user");

router.get("/:id", getUser);
router.get("/:id/follow", follow);
router.get("/:id/unfollow", unfollow);

module.exports = router;
