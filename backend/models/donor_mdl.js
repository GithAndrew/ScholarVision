const mongoose = require("mongoose")
const utils = require('./utils')

const DonorSchema = new mongoose.Schema(
    {
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        middle_name: {type: String, required: false},
        birthday: {type: String, required: true},
        birthplace: {type: String, required: true},
        suffix: {type: String, required: false},
        citizenship: {type: String, required: true},
        mobile_no: {type: String, required: true},
        email: {type: String, required: true},
        address: {type: String, required: true},
        sex: {type: String, required: true},
        statement: {type: String, required: true},
        upload_id: {type: String}
    }
)

DonorSchema.pre("save", function(next){
    const donor = this;

    donor.first_name = utils.toTitleCase(donor.first_name);
    donor.last_name = utils.toTitleCase(donor.last_name);
    donor.middle_name = utils.toTitleCase(donor.middle_name);
    return next();
});

module.exports = mongoose.model("Donor", DonorSchema);