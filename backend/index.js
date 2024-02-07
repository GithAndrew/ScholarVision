const app = require('./app.js');
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.DB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async (err) => {
      if (err) {
        console.log(`Failed to connect to Database: ${err}`);
      } else {
        console.log("Connected to Mongo DB");
  
        try {
          app.start();
        } catch (err) {
          console.log(`Error setting up Database: Error: ${err}`);
        }
      }
    }
  );
