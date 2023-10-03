const express = require("express"); // để dùng app,use()
express.Router();
const userRouter = require("./userRouter");
const inforRouter = require("./informationRouter");

function route(app) {
  app.get("/", (req, res) => {
    res.json("helo");
  });
  app.use("/users", userRouter);
  app.use("/information", inforRouter);
}
module.exports = route;
