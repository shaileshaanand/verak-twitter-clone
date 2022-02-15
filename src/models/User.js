const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    last_name: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
      immutable: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(
    canditatePassword,
    (
      await User.findOne({ username: this.username }).select("+password")
    ).password
  );
  return isMatch;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
