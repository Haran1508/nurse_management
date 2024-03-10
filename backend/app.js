const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const colors = require("colors");
colors.enable();
// set up port
const PORT = process.env.PORT || 3000;

// App Middleware
const whitelist = ["http://localhost:3001"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.json());
app.use(cors());

app.use(cors(corsOptions));

// add routes
const router = require("./routes/router.js");

app.use("/api", router);
app.use("/uploads", express.static("./uploads"));

app.set("view engine", "ejs");
// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
