const express = require("express");
const router = express.Router();

router.get("/login", (req, res, next) => {
  try {
    res.render("./login");
  } catch (error) {
    res.render("error");
  }
});

router.get("/", (req, res, next) => {
  try {
    res.render("./main");
  } catch (error) {
    res.render("error");
  }
});

module.exports = router;
