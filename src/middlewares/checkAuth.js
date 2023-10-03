require("dotenv").config();
const jwt = require("jsonwebtoken");

// MIDDLE KIỂM TRA TOKEN BÊN BACKEND => export qua router
const checkAuthentication = (req, res, next) => {
  // req đại diện cho phương thức HTTP, URL, header, tham số,...
  const authHeader = req.header("Authorization"); // Lấy phần header 'Authorization' từ request mặc định
  // Kiểm tra xem header 'Authorization' có tồn tại không
  if (!authHeader) {
    return res.sendStatus(401); // Unauthorized
  }
  // Kiểm tra xem header 'Authorization' có chứa từ khóa 'Bearer' không
  const tokenParts = authHeader.split(" "); // tách chuỗi authHeader thành một mảng các phần tử
  // Mục tiêu ở đây là tách chuỗi thành hai phần tử: loại xác thực (thường là "Bearer") và giá trị token.
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.sendStatus(401); // Unauthorized xác thực không hợp lệ.
  }
  const token = tokenParts[1]; // chuối token
  // Phương thức jwt.verify để xác thực token JWT.
  // khóa bí mật (secret key) được sử dụng để xác thực token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // Nếu token hợp lệ, user sẽ chứa thông tin được trích xuất từ token, và err sẽ là null
    if (err) {
      // error => nếu token không hợp lệ
      console.log(err);
      return res.status(403).json("Token không hợp lệ"); // Forbidden
    }
    // Lưu thông tin người dùng vào request để sử dụng ở middleware tiếp theo
    req.info = user; // tạo filed info trong object req => sử dụng req.info nhé
    next();
  });
};
// LỖI PORT
module.exports = checkAuthentication;
