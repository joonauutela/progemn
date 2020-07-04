const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        requierd: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
})


module.exports = mongoose.model('User', userSchema)