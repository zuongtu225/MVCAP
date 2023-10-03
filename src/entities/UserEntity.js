// TẠO BẢNG MỚI
// MỖI FILE CHỈ ĐƯỢC 1 TABLE THÔI

const sequelize = require("../../connect.DB"); // phải ../../ khi gặp lỗi module it's not defined

const { DataTypes } = require("sequelize");

const UserEntity = sequelize.define("listUsers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // thuộc tính autoIncrement phải ghi đúng
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
module.exports = UserEntity;
// MỐI QUAN HỆ 1 1
// user có thông tin riêng
