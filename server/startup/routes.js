const express = require("express");
let cors = require("cors");
const user = require("../src/routes/users/users.js");
const cars = require("../src/routes/cars/cars.js");
const { errorHandler } = require("../src/middleware/errorMiddleware");
const seeder = require("../src/routes/seeder/seeder.js");

module.exports = function (app) {
  app.use(express.static("public"));
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(cors());

  //   app.get("/seeder", async (req, res) => {
  //     try {
  //       await seeder();
  //       res.status(200).json({ message: "User data seeded successfully" });
  //     } catch (error) {
  //       console.error("Error seeding user data:", error.message);
  //       res.status(500).json({ error: "Internal Server Error" });
  //     }
  //   });
  app.use("/api/seeder", seeder);
  app.use("/api/users", user);
  app.use("/api/cars", cars);

  app.use(errorHandler);
};
