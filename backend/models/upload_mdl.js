const mongoose = require("mongoose")

const UploadSchema = new mongoose.Schema({
    upload_id: {type: String, required: true},
    contentType: {type: String, required: true},
    path: {type: String, required: true},
    image: {type: Object, required: true},
    
})

module.exports = mongoose.model("Upload", UploadSchema);
