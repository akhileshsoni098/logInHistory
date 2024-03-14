const registerModel = require("../Model/register");
const jwt = require("jsonwebtoken");
const LogInLogOutHistory = require("../Model/logInLogOutHistory");

///////////////////////////////////////// RegisterUser ///////////////////////////////////////////

exports.registerUser = async (req, res) => {
  try {
    const data = req.body;
    const {name, email, password} = data;
    console.log("data", data)
    // validation apne according krna
    const user = await registerModel.create(data);
console.log(user)
    res.status(201).json({ status: true, message: "success", data: user });

  } catch (err) {
    res.status(500).json({status: false, message: err.message});
  }
};


//////////////////////////// logInUser //////////////////////////






exports.logInHistory = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await registerModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
     if(user.password !== password){
        return res.status(400).json({ message: "Invalid password" });
     }
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET_KEY);
  
      // Get the current timestamp
      const logInHistory = new Date().toISOString();
  
      console.log(logInHistory);
  
      let checkHistory = await LogInLogOutHistory.findOne({ userId: user._id });
  
      if (!checkHistory) {
        let history = await LogInLogOutHistory.create({ userId: user._id, logInHistory: [{ DateAndTime: logInHistory }] });
        return res.status(201).json({ status: true, message: "History created successfully", data: history });
      }
      let updateHistory = await LogInLogOutHistory.findByIdAndUpdate(checkHistory._id, { $push: { logInHistory: { DateAndTime: logInHistory } } }, { new: true });
  
      return res.status(200).json({ status: true, message: "History updated successfully", data: updateHistory });
    } catch (error) {
      res.staus(500).json({ status: false, message:error.message})
    }
  }

/////////////////////////////////////////// LogOut user history //////////////////////////////////////
// token is nesssary for this 
exports.logOutHistory = async (req, res) => {
    try {
     const userId = req.user._id
  
      const logOutHistory = new Date().toISOString();
  
      let checkHistory = await LogInLogOutHistory.findOne({ userId });
  
      ///// here expire token logic build yourself firest need to know where you storing the token on browser ...


      if (!checkHistory) {
        let history = await LogInLogOutHistory.create({ userId, logOutHistory: [{ DateAndTime: logOutHistory }] });

        return res.status(201).json({ status: true, message: "Logout history created successfully", data: history });
      }
  
      let updateHistory = await LogInLogOutHistory.findByIdAndUpdate(checkHistory._id, { $push: { logOutHistory: { DateAndTime: logOutHistory } } }, { new: true });
  
      return res.status(200).json({ status: true, message: "Logout history updated successfully", data: updateHistory });
    } catch (error) {
      res.staus(500).json({ status: false, message:error.message})
    }
  }
  

