const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authentication");

const { getMe, updateMe } = require("../controllers/me");
router.get("", authMiddleware, getMe);
router.post("", authMiddleware, updateMe);

module.exports = router;
