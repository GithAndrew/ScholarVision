const mongoose = require("mongoose")
const utils = require('./utils')

const ApplicantSchema = new mongoose.Schema(
    {
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
        upload_id: {type: String}
    }
)

ApplicantSchema.pre("save", function(next){
    const applicant = this;

    applicant.first_name = utils.toTitleCase(applicant.first_name);
    applicant.last_name = utils.toTitleCase(applicant.last_name);
    applicant.middle_name = utils.toTitleCase(applicant.middle_name);
    return next();
});

module.exports = mongoose.model("Applicant", ApplicantSchema);