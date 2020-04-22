const express = require("express");
const webpush = require("web-push");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const { port, mongoURI } = require("./config/config.development");

require("./models/subscribers_model");

// Mongoose Connect
mongoose.Promise = global.Promise;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//Create Express middleware
const app = express();
// app.set('trust proxy', true);
// parse application/json
app.use(cors());
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));
// app.set('views', __dirname + '/public/js');

//Routes

const index = require("./router");
const push = require("./router/push");
const subscribe = require("./router/subscriber");

// Use Routes
app.use("/", index);
app.use("/subscription", subscribe);
app.use("/sendNotification", push);

// const fakeDatabase = [];
// app.post("/subscription", (req, res) => {
//   const subscription = req.body;
//   console.log(subscription);
//   fakeDatabase.push(subscription);
//   res.status(200).json({ data: fakeDatabase });
//   // sendNotification();
// });

// app.post("/sendNotification", (req, res) => {
//   const notificationPayload = req.body;

//   const promises = [];

//   fakeDatabase.forEach((subscription) => {
//     promises.push(
//       webpush.sendNotification(
//         subscription,
//         JSON.stringify(notificationPayload)
//       )
//     );
//   });
//   Promise.all(promises).then(() => res.sendStatus(200));
// });

// app.get("/", (req, res) => {
//   res.status(200).json({ data: fakeDatabase });
// });

//Server listen
app.listen(port, () => {
  console.log("Server started on port " + port);
});
