const express = require("express");
const router = express.Router();
const { getMe, updateMe } = require("../controllers/me");
router.get("", getMe);
router.post("", updateMe);

module.exports = router;
