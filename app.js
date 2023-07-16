const express = require("express");
let cors = require("cors");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");
require("colors");

const moviesRouter = require("./routes/entertainment/moviesRoutes")
const authEntertainmentRouter = require("./routes/entertainment/authRoutes");
const authRouter = require("./routes/entertainment/authRoutes");

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
app.use("/api/entertainment/auth", authRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});


module.exports = app