const mongoose = require("mongoose")

const ScholarshipSchema = new mongoose.Schema({
        donor: {type: String, required: true},
        grant: {type: Number, required: true},
        scholarshipname: {type: String, required: true},
        year: {type: String, required: true},
        details: {type: String, required: true},
        donor_id: {type: String, required: true}
})

module.exports = mongoose.model("Scholarship", ScholarshipSchema);
