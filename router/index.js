const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Subscription = mongoose.model("subscribers");

router.get("/", (req, res) => {
  Subscription.find({}, (err, subscriptions) => {
    if (err) {
      console.error(`Error occurred while getting subscriptions`);
      res.status(500).json({
        error: "Technical error occurred",
      });
    } else {
      res.json({
        status: "ok",
        message: "Server is running",
        data: subscriptions,
      });
    }
  });
});

module.exports = router;
