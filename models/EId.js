const mongoose = require('mongoose');
const { Schema } = mongoose;

const EIdSchema = new Schema({
    eId: {
        type: Number,
    }
});
const user = mongoose.model('empId', EIdSchema);
module.exports = user;