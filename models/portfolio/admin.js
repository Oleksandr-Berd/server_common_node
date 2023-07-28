const { model, Schema } = require("mongoose");
const { handleMongooseError } = require("../../utils");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const schemaAdminPortfolio = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

schemaAdminPortfolio.post("save", handleMongooseError);

const AdminPortfolio = model("adminPortfolio", schemaAdminPortfolio);

module.exports = { AdminPortfolio };
