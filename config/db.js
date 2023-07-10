const mongoose = require("mongoose");

// mongoose.connect()

const connectDB = async () => {
  try {
    console.log(process.env.DB_URI);
    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(process.env.DB_URI);
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
