const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authentication");

const { feed } = require("../controllers/feed");

router.get("", authMiddleware, feed);

module.exports = router;
