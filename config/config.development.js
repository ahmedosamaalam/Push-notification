// config.js
// const dotenv = require("dotenv");
// const result = dotenv.config();

module.exports = {
  endpoint: process.env.API_URL,
  port: process.env.PORT,
  publicVapid: process.env.PUBLIC_VAPID,
  privateVapid: process.env.PRIVATE_VAPID,
  mongoURI: process.env.MONGO_DB,
};
