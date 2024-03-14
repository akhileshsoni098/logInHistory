const jwt = require("jsonwebtoken");

///////////////// authenticcation ////////////////

exports.authentication = function (req, res, next) {
  let token = req.headers["x-auth-token"];

  if (!token) {
    return res
      .status(400)
      .json({
        status: false,
        message: "Please login or register and verify yourself",
      });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async function (err, decoded) {
    if (err) {
      return res.status(401).json({ status: false, message: err.message });
    } else {
      req.user = decoded;
      req.role = decoded.role;
      next();
    }
  });
};

////////////// authorization for admin ///////////////

exports.authorization = async (req, res, next) => {
  const admin = req.role;
  console.log(admin);

  if (admin !== "admin") {
    return res
      .status(403)
      .json({ status: false, message: "Unauthorize Access" });
  } else {
    next();
  }
};
