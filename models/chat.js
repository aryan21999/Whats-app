const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat