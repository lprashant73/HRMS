const mongoose = require('mongoose');
const voterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    father:{
        type:String,
        required:true
    },
    mother:{
    type:String,
    required:true
    },
    spouse:{
        type:String,
        default:"Wife/Husband"
    },
    age:{
        type:Number,
        required:true
    },
    phone: {
        type: Number,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address:{
        type:String,
        required:true
    }
});
const Voter = mongoose.model('Voter',voterSchema);
module.exports = Voter;