const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { fullName, email, password, confirm_password} =
    req.body;

  //validations
  if (!fullName) throw "Full name must be provided";
  if (!password) throw "Password must be provided";
  if (!email) throw "Email must be provided";
  if (password.length < 5) throw "Password must be more than 5 characters";
  if (password != confirm_password)
    throw "Password and confirm password donot match";

  //helps in finding the email again if it is in the database then it throws an error and validation below works.
  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw "Email already exists";

  //Hashing/Encrypting the given password so that it doesn't leak the essential information.

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await usersModel.create({
    fullName: fullName,
    email: email,
    password: hashedPassword,
    confirm_password: confirm_password,
  });

  const accessToken = jwtManager(createdUser);
  
  res.status(201).json({
    status: "User registered successfully !!",
    accessToken: accessToken,
  });
};

module.exports = register;