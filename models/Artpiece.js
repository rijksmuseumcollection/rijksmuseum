const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const artPieceSchema = new Schema({
  image: String,
  longTitle: String,
  author: String,
  type: String,
  material: String,
  technique: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const ArtPiece = mongoose.model('ArtPiece', artPieceSchema);
module.exports = ArtPiece;