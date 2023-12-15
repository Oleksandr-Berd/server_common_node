const mongoose = require("mongoose");
const { Projects } = require("../models");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(process.env.DB_URI);

    // Fetch documents and sort by creation date in descending order
    console.log(
      `Successful connection to DB, name: ${db.connection.name} on port: ${db.connection.port}, on host: ${db.connection.host}`
        .bold.brightCyan.italic
    );

    // Log the sorted documents for verification

    // Return the sorted documents if needed
  } catch (error) {
    console.error(
      `There is some error occur: ${error.message}`.bold.red.italic
    );
  }
};

module.exports = connectDB;
