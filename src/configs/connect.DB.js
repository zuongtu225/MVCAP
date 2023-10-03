const Sequelize = require("sequelize");

const connectionMySQL = new Sequelize("users", "root", "9999", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
});

const connection = async () => {
  try {
    await connectionMySQL.authenticate();
    console.log("KẾT NỐI THÀNH CÔNG");
  } catch (error) {
    console.log("LỖI KẾT NỐI", error);
  }
};

connection();
module.exports = connectionMySQL; // phải xuất connectionMySQL để dùng được METHOD defined
