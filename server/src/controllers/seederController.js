const express = require("express");

const asyncHandler = require("express-async-handler");

const { Users } = require("../models/users");

const bcrypt = require("bcryptjs");

// @desc Store data in database
// @route GET /api/Seeder
// @access Public
const saveSeeder = asyncHandler(async (req, res) => {
  try {
    // create admin
    const salt = await bcrypt.genSalt(10);
    const encryptPass = await bcrypt.hash("123456abc", salt);
    // Seed a new user
    const newUser = new Users({
      full_name: "Amjad",
      email: "amjad@desolint.com",
      password: encryptPass,
    });

    const user = new Users(newUser);

    await user.save();

    return res.status(200).json({ message: "successfully added" });
  } catch (error) {
    res.status(res.statusCode ? res.statusCode : 500);
    console.log("Something went wrong during seeding data: ", error);
    throw new Error(
      `${
        res.statusCode !== 400
          ? "Something went wrong during seeding data: "
          : ""
      }${error.message}`
    );
  }
});

module.exports = { saveSeeder };

// // seeder.js

// const seedUsers = async () => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const encryptPass = await bcrypt.hash("123456abc", salt);
//     // Seed a new user
//     const newUser = new Users({
//       full_name: "Amjad",
//       email: "amjad@desolint.com",
//       password: encryptPass,
//     });

//     await newUser.save();
//     console.log("User data seeded successfully");
//   } catch (error) {
//     console.error("Error seeding user data:", error.message);
//   }
// };

// module.exports = seedUsers;
