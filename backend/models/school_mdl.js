const mongoose = require("mongoose")

const SchoolSchema = new mongoose.Schema({
    school_name: {type: String, required: true},
    email: {type: String, required: true},
    contact_no: {type: String, required: true},
    location: {type: String, required: true},
    upload_id: {type: String},
    member_emails: {type: Array},
    admin_email: {type: String}
})

module.exports = mongoose.model("Schools", SchoolSchema);
