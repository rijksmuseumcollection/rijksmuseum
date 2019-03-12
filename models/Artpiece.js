const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artPieceSchema = new Schema({
    image: String,
    title: String,
    description: String,
    author: String,
    age: Date,
    technique: String
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const ArtPiece = mongoose.model('ArtPiece', artPieceSchema);
module.exports = ArtPiece;