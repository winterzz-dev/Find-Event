const express = require("express");
// const path = require('path');
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ extended: true }));
app.use("/api/cities", require("./routes/cities.routes"));
app.use("/api/city", require("./routes/city.routes"));
app.use("/api/country", require("./routes/country.routes"));
app.use("/api/events", require("./routes/events.routes"));
app.use("/api/keys", require("./routes/keys.routes"));

const PORT = config.get("port") || 5000;

const start = async () => {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}!`);
    });
  } catch (error) {
    console.log(`Server error: ${error.message}`);
    process.exit(1);
  }
};

start();
