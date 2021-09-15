const mongoose = require('mongoose')
const validator = require('validator')

const friendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    owner: {
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'User'
    }
})


const Friend = mongoose.model('Friend', friendSchema)

module.exports = Friend