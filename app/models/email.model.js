
const mongoose = require('mongoose');
const validator = require('validator');

const EmailSchema = mongoose.Schema({
    senderName: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    
 
    senderEmail: {
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