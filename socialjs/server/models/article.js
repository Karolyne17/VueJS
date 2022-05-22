const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
        auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        titre: { type: String },
        texte: { type: String },
        date: { type: Date },
        like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        commentaire: { type: String },
        photo: { type: String },
    },
    // {_id: false, timestamp: false}
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Article', articleSchema);