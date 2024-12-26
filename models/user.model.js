const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name must be provided"],
    },
    profile_picture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    email: {
      type: String,
      required: [true, "Email address must be provided"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password must be provided"],
    },
    reset_code: {
      type: Number,
    },
  },
  { timestamps: true }
);

const usersModel = mongoose.model("users", userSchema);

module.exports = usersModel;