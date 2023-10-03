const express = require("express");

const userRouter = express.Router();
const UserController = require("../controllers/userController");
const checkAuthentication = require("../middlewares/checkAuth"); // check
const checkRole = require("../middlewares/checkRole");

userRouter.get("/", checkAuthentication, UserController.getAllUsers);
userRouter.get("/me", checkAuthentication, UserController.getOneUser);

userRouter.post("/create", UserController.register);
userRouter.post("/login", UserController.handleLogin);

// userRouter.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const user = await listUsers.findOne({ where: { id: id } });
//     // const userPK = await listUsers.findByPK(id);
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "THẤT BẠI", error });
//   }
// });
// userRouter.post("/create", async (req, res) => {
//   try {
//     const newUser = await listUsers.create({ fullname: req.body.fullname });
//     res.json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: "THẤT BẠI", error });
//   }
// });
// // DELETE
// userRouter.delete("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const result = await listUsers.destroy({ where: { id: id } });
//     console.log("result =>", result); // result => 0
//     if (!result) {
//       // nếu # 0 (false) thì thành công
//       res.json({ message: "XÓA THÀNH CÔNG" });
//     } else {
//       res.status(404).json({ message: "XÓA THẤT BẠI" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "THẤT BẠI", error });
//   }
// });
// // UPDATE
// userRouter.put("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const newFullname = req.body.fullname;
//     const newUpdate = await listUsers.update(
//       { fullname: newFullname },
//       { where: { id: id } }
//     );
//     if (newUpdate[0] > 0) {
//       // giá trị mảng [0] vị trí 0 , nếu result sai thì là 0,   ko thể dùng if(!newUpdate)
//       res.json({ message: "Cập nhật thành công" });
//     } else {
//       res.status(404).json({ message: "Cập nhật thất bại" });
//     }
//   } catch (error) {
//     res.json({ message: "Cập nhật thất bại" });
//   }
// });

module.exports = userRouter;
