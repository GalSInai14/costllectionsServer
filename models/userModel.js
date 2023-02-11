const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Please add your id."],
    },
    firstName: {
      type: String,
      required: [true, "Please add your first name."],
    },
    lastName: {
      type: String,
      required: [true, "Please add your last name."],
    },
    birthDay: {
      required: true,
      type: Date,
    },
  },

  {
    timestamps: true,
  }
);

// userSchema.pre("save", async function (next) {
//   //Only run this function if password was actually modified
//   if (!this.isModified("password")) return next();

//   //Hash the password with cost of 10
//   this.password = await bcrypt.hash(this.password, 10);

//   //Delete passwordConfirm field
//   this.passwordConfirm = undefined;

//   next();
// });
// userSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

const User = mongoose.model("User", userSchema);
module.exports = User;
