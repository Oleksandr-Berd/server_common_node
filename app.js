const express = require("express");
let cors = require("cors");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");
require("colors");

const moviesRouter = require("./routes/entertainment/moviesRoutes")
const authEntertainmentRouter = require("./routes/entertainment/authRoutes");
const projectsRoutes = require("./routes/portfolio/projectsRoutes");
const adminPortfolioRoutes = require("./routes/portfolio/adminRoutes");
const mailRoutes = require("./routes/portfolio/mail");
const countriesRoutes = require('./routes/countries/countriesRoutes');
const galleriaRouter = require("./routes/galleria/galleriaRoutes");
const quizRouter = require("./routes/quiz/quizRoutes");
const markdownRouter = require("./routes/markdown/markdownRoutes");

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
app.use(express.static("public"))

const pathToEnv = path.join(__dirname, "..", "config", ".env");

dotenv.config({ path: pathToEnv });

app.use("/api/entertainment", moviesRouter);
app.use("/api/entertainment/auth", authEntertainmentRouter);
app.use("/api/portfolio/", projectsRoutes)
app.use("/api/portfolio/", adminPortfolioRoutes);
app.use("/api/portfolio/", mailRoutes);
app.use("/api/countries/", countriesRoutes);
app.use("/api/galleria/", galleriaRouter);
app.use("/api/quiz/", quizRouter)
app.use("/api/markdown/", markdownRouter);





app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});


module.exports = app