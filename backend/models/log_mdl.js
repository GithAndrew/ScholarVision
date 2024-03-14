const mongoose = require("mongoose");

const LogsSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    userName: {type: String, required:true},
    userEmail: {type: String, required:true},
    userRole: {type: String, required:true},
    action: {type: String, required:true},
    description: {type: String, required:true},
    date: {type: Object}   
})

module.exports = mongoose.model("Log", LogsSchema);
