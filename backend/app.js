const express = require('express')
const cookieParser = require("cookie-parser");
const Router = require('./router');
const formData = require('express-form-data');
require("dotenv").config();

exports.start = () => {
    const app = express();
    app.use(formData.parse());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "https://scholar-vision.vercel.app")
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE")
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Access-Control-Allow-Methods,Origin,Accept,Content-Type")
        res.setHeader("Access-Control-Allow-Credentials","true")
        next()
    })

    app.use('/', Router);
    
    app.listen("https://scholar-vision-backend.vercel.app", '0.0.0.0', (err) => {
        if (err) { console.log(err) }
        else {console.log(`Server started`)}
    })
}
