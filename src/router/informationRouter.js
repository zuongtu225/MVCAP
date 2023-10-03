const express = require("express");

const inforRouter = express.Router();
const listInfo = require("../models/information.model"); //  dùng sequelize executed

inforRouter.get("/", async (req, res) => {
  try {
    const user = await listInfo.findAll();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "THẤT BẠI", error });
  }
});
inforRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await listInfo.findOne({ where: { id: id } });
    // const userPK = await listUsers.findByPK(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "THẤT BẠI", error });
  }
});
inforRouter.post("/create", async (req, res) => {
  try {
    const newUser = await listInfo.create({
      cardID: req.body.cardID,
      userID: req.body.userID,
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: "THẤT BẠI", error });
  }
});
// DELETE
inforRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await listInfo.destroy({ where: { id: id } });
    console.log("result =>", result); // result => 0
    if (!result) {
      // nếu # 0 (false) thì thành công
      res.json({ message: "XÓA THÀNH CÔNG" });
    } else {
      res.status(404).json({ message: "XÓA THẤT BẠI" });
    }
  } catch (error) {
    res.status(500).json({ message: "THẤT BẠI", error });
  }
});
// UPDATE
inforRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newFullname = req.body.fullname;
    const newUpdate = await listInfo.update(
      { fullname: newFullname },
      { where: { id: id } }
    );
    if (newUpdate[0] > 0) {
      // giá trị mảng [0] vị trí 0 , nếu result sai thì là 0,   ko thể dùng if(!newUpdate)
      res.json({ message: "Cập nhật thành công" });
    } else {
      res.status(404).json({ message: "Cập nhật thất bại" });
    }
  } catch (error) {
    res.json({ message: "Cập nhật thất bại" });
  }
});

module.exports = inforRouter;
