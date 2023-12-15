const mongoose = require("mongoose");
const { Projects } = require("../models");


const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(process.env.DB_URI);
    const sortedDocuments = await Projects.find().sort({ createdAt: -1 });
    console.log(
      `Successful success with DB, name: ${db.connection.name} on port: ${db.connection.port}, on host: ${db.connection.host}`
        .bold.brightCyan.italic
    );
  } catch (error) {
    console.error(
      `There is some error occur: ${error.message}`.bold.red.italic
    );
  }
}

module.exports = connectDB
