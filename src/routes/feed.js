const express = require("express");
const router = express.Router();
const { feed } = require("../controllers/feed");

router.get("", feed);

module.exports = router;
