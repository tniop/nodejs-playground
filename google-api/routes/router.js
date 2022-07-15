const express = require("express");
const router = express.Router();

const { googleChatTest } = require("../controllers/google-chat");

router.post("/test", googleChatTest);

module.exports = router;
