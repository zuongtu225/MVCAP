const sequelize = require("../../connect.DB");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

// Tạo Table
const Info = sequelize.define("information", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cardID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});

// JOIN 2 tables
User.hasOne(Info, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
}); // tự tạo userID
Info.belongsTo(User, { foreignKey: "userID" });

Info.sync().then(() => {
  console.log("ok");
});
module.exports = Info;
