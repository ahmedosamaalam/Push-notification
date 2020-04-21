const express = require("express");
const webpush = require("web-push");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.port || 3001;

const PUBLIC_VAPID = "";
const PRIVATE_VAPID = "";

const app = express();

app.use(cors());
app.use(bodyParser.json());
webpush.setVapidDetails(
  "mailto:http://localhost:8080/",
  PUBLIC_VAPID,
  PRIVATE_VAPID
);

//Routes
const fakeDatabase = [];
app.post("/subscription", (req, res) => {
  const subscription = req.body;
  console.log(subscription);
  fakeDatabase.push(subscription);
  res.status(200).json({ data: fakeDatabase });
  // sendNotification();
});

app.post("/sendNotification", (req, res) => {
  const notificationPayload = req.body;

  const promises = [];

  fakeDatabase.forEach((subscription) => {
    promises.push(
      webpush.sendNotification(
        subscription,
        JSON.stringify(notificationPayload)
      )
    );
  });
  Promise.all(promises).then(() => res.sendStatus(200));

  setInterval(() => {
    const promises = [];

    fakeDatabase.forEach((subscription) => {
      promises.push(
        webpush.sendNotification(
          subscription,
          JSON.stringify(notificationPayload)
        )
      );
    });
    Promise.all(promises).then(() => {});
  }, 10000);
});

app.get("/", (req, res) => {
  res.status(200).json({ data: fakeDatabase });
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
