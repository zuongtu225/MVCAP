// CONNECT MySQL
const User = require("../models/user.model");
const bycript = require("bcrypt");

// JWT
require("dotenv").config();
const jwt = require("jsonwebtoken");

// CREATE TABLE

class UserController {
  // GET ALL Users
  async getAllUsers(req, res) {
    try {
      // const listUsers = await User.findAll({ include: "information" });
      const listUsers = await User.findAll();
      res.json(listUsers);
    } catch (error) {
      res.status(500).json({ message: "THẤT BẠI", error });
    }
  }
  async getOneUser(req, res) {
    const { id } = req.info;
    try {
      // const listUsers = await User.findAll({ include: "information" });
      const listUsers = await User.findOne({
        where: { id: id },
      });
      res.json(listUsers);
    } catch (error) {
      res.status(500).json({ message: "THẤT BẠI", error });
    }
  }

  // REGISTER
  async register(req, res) {
    const { email, password, fullname, role } = req.body;
    try {
      const checkEmail = await User.findOne({
        where: { email: email },
      });
      if (checkEmail) {
        return res.status(400).json({ message: "Email đã tồn tại" });
      } else {
        const genSalt = await bycript.genSalt(10); // genSalt tạo ra giá trị salt, Salt là một chuỗi ngẫu nhiên được kết hợp với mật khẩu của người dùng
        // console.log(genSalt); // $2b$10$/QIzIQImhwYLccKvmISfVu
        const newPassword = await bycript.hash(password, genSalt);
        // console.log(newPassword); // $2b$10$/QIzIQImhwYLccKvmISfVuxb6A18idogWjquzhTdg.kZjpeEee42a
        // hash băm nhỏ password
        await User.create({
          fullname: fullname,
          email: email,
          password: newPassword,
          role: role,
        });
        res.status(200).json({ message: "THÊM THÀNH CÔNG", role: role });
      }
    } catch (error) {
      res.status(500).json({ message: "THẤT BẠI", error });
    }
  }

  // LOGIN
  async handleLogin(req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    try {
      const user = await User.findOne({ where: { email: email } });
      const findUser = user.dataValues;
      if (!findUser) {
        return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
      }

      const checkPassword = await bycript.compare(password, findUser.password); // return true false
      if (checkPassword) {
        const { password, createdAt, updatedAt, ...data } = findUser; // trả về trừ password
        const jwtData = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
        // phương thức .sign của thư viện JWT để tạo một token JWT

        return res.status(200).json({
          access_token: jwtData,
          data: data,
        });
      } else {
        return res.status(401).json({ message: "Đăng nhập thất bại" });
      }
    } catch (error) {
      return res.status(400).json({ error, message: "Đăng nhập thất bại" });
    }
  }
}
module.exports = new UserController(); // phải xuất kiểu này
