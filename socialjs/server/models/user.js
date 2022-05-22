const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
        email: { type: String },
        pseudo: { type: String },
        password: { type: String },
        photo: { type: String },
    },
    // {_id: false, timestamp: false}
    {
        versionKey: false
    }
);

module.exports = mongoose.model('User', userSchema);