const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);