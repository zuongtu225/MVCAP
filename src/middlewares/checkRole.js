const checkRole = (req, res, next) => {
  next();
  try {
    const roleNum = req.info.role;
    if (roleNum == 1) {
      next();
    } else if (roleNum == 2) {
      res.status(403).json("Forbidden");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = checkRole;
// check đăng nhập => authentication
// check role => authorization
