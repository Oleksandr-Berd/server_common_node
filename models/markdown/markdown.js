const { model, Schema } = require("mongoose");

const schemaMarkdown = Schema(
  {
    name: String,
    content: String,
  },
  { versionKey: false, timestamps: true }
);

schemaMarkdown.pre("save", function (next) {
  this.createdAt = this.createdAt.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  next();
});

const MarkdownModel = model("markdowns", schemaMarkdown);

module.exports = { MarkdownModel };
