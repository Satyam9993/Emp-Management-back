const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
    eId: {
        type: Number,
        require : true,
        unique : true
    },
    name: {
        type: String,
        required : true
    },
    dob : {
        type: Date,
        required: true
    },
    department : {
        type: String,
        required: true
    },
    location : {
        name : {
            type:String,
            required: true
        },
        lng : {
            type : Number,
            required: true
        },
        lat : {
            type : Number,
            required: true
        }
    },
    status : {
        type:String,
        required: true,
        enum : ["Remote Location", "Contract Employee", "Full-Time"],
        default: "Full-Time"
    },
    createdOn : {
        type: Date,
        default: Date.now 
    }
});
const employee = mongoose.model('employee', EmployeeSchema);
module.exports = employee;