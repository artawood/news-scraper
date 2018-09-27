var mongoose = require("mongoose");

// Schema constructor
var Schema = mongoose.Schema;

// Create a new UserSchema object
var ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  summary: {
    type: String,
    required: true
  }
});

var article = mongoose.model("article", ArticleSchema);

// Export the Article model
module.exports = article;