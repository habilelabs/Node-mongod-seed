
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = Schema({
    name : {
        firstName : {
            type: String
        },
        lastName : {
            type: String
        }
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String
    },
    role:{
        type: String
    },
    lastValid:{
        type: Date
    }

},{versionKey: false});

module.exports = mongoose.model('User', UserSchema);
