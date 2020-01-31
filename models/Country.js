const { Schema, model } = require("mongoose");

const schema = new Schema({
  vkId: { type: Number, required: true, unique: false },
  title: { type: String, required: true, unique: true }
});

module.exports = model("Country", schema);
