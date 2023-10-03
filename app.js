const express = require("express");
require("dotenv").config();
const cors = require("cors");
const port = process.env.APP_PORT || 6000;

require("./connect.DB");

// const User = require("./src/models/user.model");
// User.sync().then(() => {
//   console.log("ok User");
// });
// // mỗi lần create xong thì phải comment lại nếu không when save sẽ tạo mới mãi

// const Info = require("./src/models/information.model");
// Info.sync().then(() => {
//   console.log("ok Info");
// });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"], // Use "methods" instead of "method"
  })
);
const route = require("./src/router/index");
route(app);

app.listen(port, () => {
  console.log(`WWEB http://localhost:${port}/`);
});
