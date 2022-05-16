const mongoose = require('mongoose'); 
// Mongoose model is a wrapper on the Mongoose schema.
// Mongoose schema defines the strucutre of the document, default values, validators,etc.
// Whereas a mongoose model provides an interface to the database for creating, querying,updating,
// deleting records,etc.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength:50
    },
    email: {
        type: String,
        trim: true,
        unique:1
    },
    password: {
        type: String,
        maxlength:50
    },
    role: {
        type: Number,
        default:0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type:Number
    }
});

const User = mongoose.model('User', userSchema);
module.exports = { User };