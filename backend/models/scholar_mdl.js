const mongoose = require("mongoose")
const utils = require('./utils')

const ScholarSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    middle_name: {type: String, required: false},
    suffix: {type: String, required: false},
    student_no: {type: String, required: true},
    graduation_year: {type: String, required: true},
    mobile_no: {type: String, required: true},
    email: {type: String, required: true},
    birthday: {type: Date},
    birthplace: {type: String},
    sex: {type: String},
    citizenship: {type: String},
    address: {type: Object, required: true},
    father_details:{type:Object},
    mother_details:{type:Object},
    guardian_details:{type:Object},
    sibling_details:  {type: Object},
    educational_bg: {type: Object},
    statement: {type: String},
    applicant_link: {type: String},
    scholarship_id: {type: String},
    acceptance_date: {type: Date},
    upload_id: {type: String},
    newFields: {type: mongoose.Schema.Types.Mixed}
})

ScholarSchema.pre("save", function(next){
    const scholar = this;

    scholar.first_name = utils.toTitleCase(scholar.first_name);
    scholar.last_name = utils.toTitleCase(scholar.last_name);
    scholar.middle_name = utils.toTitleCase(scholar.middle_name);
    return next();
});

module.exports = mongoose.model("Scholar", ScholarSchema);
