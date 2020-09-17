
const mongoose = require('mongoose');
const validator = require('validator');

const EmailSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' })
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    
}, {
    timestamps: true
});

const Email = mongoose.model('Email', EmailSchema);
module.exports = Email;