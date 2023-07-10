const mongoose = require("mongoose");

const {DB_URI} = require("../config")


const connectDB = async () => {
  try {
    console.log(DB_URI);
    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(DB_URI);
    console.log(
      `Successful success with DB, name: ${db.connection.name} on port: ${db.connection.port}, on host: ${db.connection.host}`
        .bold.brightCyan.italic
    );
  } catch (error) {
    console.error(
      `There is some error occured: ${error.message}`.bold.red.italic
    );
  }
}

module.exports = connectDB
