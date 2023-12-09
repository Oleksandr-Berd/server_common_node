const { model, Schema } = require("mongoose");

const schemaMarkdown = Schema({
  createdAt: String,
  name: String,
  content: String,
  
});

const MarkdownModel = model("markdown", schemaMarkdown);

module.exports = { MarkdownModel };
