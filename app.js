const express = require("express");
let cors = require("cors");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");
require("colors");

const moviesRouter = require("./routes/entertainment/moviesRoutes")

const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your_secret_key_here",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

const pathToEnv = path.join(__dirname, "..", "config", ".env");

dotenv.config({ path: pathToEnv });


app.use("/api/entertainment", moviesRouter);


module.exports = app