const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// generate salt and encrypt password
const saltRounds = 10; // 10 digits
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
        minlength:5
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

// password encrypt part
// this will be executed before save function
userSchema.pre('save', function (next) {
    var user = this;
    // if user change password, encrypt password
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            // If error occur move to next function 
            if (err) return next(err)
            // hash pasword need two arguments unencrypted password and salt
            bcrypt.hash(user.password, salt, function (err,hash) {
                if (err) return next(err)
                user.password = hash
                 // move to next function
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function (unencryptedPw, callback) {
    bcrypt.compare(unencryptedPw, this.password, function (err, isEqual) {
        if (err) return callback(err);
        callback(null, isEqual);    
        
    })
}
userSchema.methods.createToken = function (callback) {
    // Create token by utilizing jsonwebtoken package
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function (err, user) {
        if (err) return callback(err) 
        callback(null,user)    
    })
    
}
const User = mongoose.model('User', userSchema);
module.exports = { User };