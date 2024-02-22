const mongoose = require("mongoose")

const DeletedSchema = new mongoose.Schema({
    object_type: {type: String, required: true},
    object: {type: Object, required: true}
})

module.exports = mongoose.model("Deleted", DeletedSchema);