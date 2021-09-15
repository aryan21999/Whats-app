const mongoose = require('mongoose')
const validator = require('validator')

const chatSchema = new mongoose.Schema({
    chat: [{
        sent: {
            type: Boolean,
            required: false,
            trim: true,
        },
        messages: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
            ref: 'User'
        },
        friends: {
            type: String,
            required: true,
            ref: 'Email'
        },
    },
    {
        timestamps: true
    },
    ]
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat