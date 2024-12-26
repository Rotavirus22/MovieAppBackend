const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");

const login = async (req, res) => {
  //creating the userModel variable which helps to identify the name of the schema
  const userModel = mongoose.model("users");

  const { email, password } = req.body;

  //it helps to identify the user on the basis of the email.
  const getUser = await userModel.findOne({
    email: email,
  });

  if (!getUser) throw "Email doesnot exist in our system";

  //comparing the password with the given password with the valid password in the database
  const comparePassword = await bcrypt.compare(password, getUser.password);

  if (!comparePassword) throw "Email and password donot match";

  //generating the accessToken so that it validates the user on further process.

  const accessToken = jwtManager(getUser);

  res.status(200).json({
    status: "success",
    message: "User Logged in successfully",
    accessToken: accessToken,
  });
};

module.exports = login;