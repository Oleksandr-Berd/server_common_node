const { model, Schema } = require("mongoose");

const schemaMarkdown = Schema(
  {
    name: String,
    content: String,
  },
  { versionKey: false, timestamps: true }
);


const MarkdownModel = model("markdowns", schemaMarkdown);

module.exports = { MarkdownModel };
