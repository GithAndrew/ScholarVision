// dependencies 
const app = require('./app.js');
const mongoose = require("mongoose");
require("dotenv").config();
// connect to database
mongoose.connect(
    process.env.DB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async (err) => {
      if (err) {
        console.log(`Failed to connect to Database: ${err}`);
      } else {
        console.log("Connected to Mongo DB");
  
        try {
          // start server
          app.start();
        } catch (err) {
          console.log(`Error setting up Database: Error: ${err}`);
        }
      }
    }
  );
