const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Subscription = mongoose.model("subscribers");
const webPush = require("web-push");

router.post("/", (req, res) => {
  const notificationPayload = req.body;

  // { username: "osama" }
  Subscription.find({}, (err, subscriptions) => {
    if (err) {
      console.log(`Error occurred while getting subscriptions`);
      res.status(500).json({
        error: "Technical error occurred",
      });
    } else {
      console.log(subscriptions);
      const promises = [];

      subscriptions.forEach((subscription) => {
        promises.push(
          webPush.sendNotification(
            subscription,
            JSON.stringify(notificationPayload)
          )
        );
      });
      const unique = Array.from(promises);
      Promise.all(unique)
        .then((data) =>
          res.status(200).json({ message: "Push triggered", data: data })
        )
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

// fixed the error get request for this route with a meaningful callback
router.get("/", (req, res) => {
  res.json({
    data: "Invalid Request Bad",
  });
});
module.exports = router;
