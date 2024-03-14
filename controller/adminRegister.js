const registerModel = require("../Model/register");
const jwt = require("jsonwebtoken");
const LogInLogOutHistory = require("../Model/logInLogOutHistory");

/////////////////////////////////// register ////////////

exports.adminRegister = async (req, res) => {
  try {
    const data = req.body;
    const { name, email, password, role } = data;
    // validation apne according krna

    if (!role || role !== "admin") {
      return res.status(400).json({ status: false, message: "invalid role" });
    }
    const admin = await registerModel.create(data);

    res.status(201).json({ status: true, message: "success", data: admin });
  } catch (err) {
    res.status(400).json(err);
  }
};

////////////////////////////admin login///////////////////////////

exports.adminLogin = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;
    const admin = await registerModel.findOne({ email: email });
    if (!admin) {
      return res
        .status(400)
        .json({ status: false, message: "invalid email or password" });
    }
    if (password !== admin.password) {
      return res
        .status(400)
        .json({ status: false, message: "invalid password" });
    }

    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
      process.env.JWT_SECRET_KEY
    );

    res
      .status(200)
      .json({ status: true, message: "success", data: admin, token: token });
  } catch (err) {
    res.status(500).json({ staus: false, message: err.message });
  }
};



////////////////////////////admin get all user logIn history data ///////////////////////////
// admin login token should be in headers

exports.getAllUserLogInHistory = async (req, res) => {
    try {
        const data = await LogInLogOutHistory.find().populate('userId');
        res.status(200).json({ status: true, message: "Success", data: data });
    } catch (err) {
        console.error("Error fetching login history:", err);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}