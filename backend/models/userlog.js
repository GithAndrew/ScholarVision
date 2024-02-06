const mongoose = require("mongoose");

const UserLogsSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        userEmail: {type: String, required:true},
        action: {type: String, required:true},
        description: {type: String, required:true},
        date: {type: Object}
        
    }
)

module.exports = mongoose.model("UserLog", UserLogsSchema);