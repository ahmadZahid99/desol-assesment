const express = require("express");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 6062;

require("./startup/logging")();
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/prod")(app);

// app.listen(port, () => console.log(`Server started on port ${port}`));
app.listen(port, () => logger.info(`Server started on port ${port}`));
