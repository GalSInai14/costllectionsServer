// const User = require("../models/userModel");
// // @desc   Register a new user
// // @route  /api/users
// // @access Public
// const registerUser = async (req, res) => {
//   const { id, firstName, lastName, birthDay } = req.query;

//   // Validation
//   // if (!id || !password) {
//   //   res.status(400);
//   //   throw new Error("Please include all fields.");
//   // }

//   //Find if user already exists
//   const userExists = await User.findOne({ id });

//   if (userExists) {
//     res.status(400);
//     throw new Error("User already exists.");
//   }

//   //Create user
//   const user = await User.create({
//     id,
//     firstName,
//     lastName,
//     birthDay,
//   });

//   if (user) {
//     res.status(201).json({
//       _id: id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       birthDay: user.birthDay.toDateString(),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid user data.");
//   }
// };

// // @desc   Login a user
// // @route  /api/users/login
// // @access Public
// const loginUser = async (req, res) => {
//   const { id } = req.query;
//   //1) Check if email and password exist
//   if (!id) {
//     res.status(400);
//     throw new Error("Please provide id and password.");
//   }

//   //2) Check if user exists and password is correct
//   const user = await User.findOne({ id });
//   if (!user) {
//     res.status(401);
//     throw new Error("Incorrect .");
//   }
//   res.status(200).json({
//     _id: user._id,
//     id: user.id,
//     firstName: user.firstName,
//   });
// };

// // @desc   Get current user
// // @route  /api/users/me
// // @access Private

// const getMe = async (req, res) => {
//   const user = {
//     _id: req.user._id,
//     id: req.user.id,
//     firstName: req.user.firstName,
//     lastName: req.user.lastName,
//     birthDay: req.user.birthDay.toDateString(),
//   };
//   res.status(200).json(user);
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   getMe,
// };
