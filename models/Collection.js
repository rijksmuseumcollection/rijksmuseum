const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const collectionSchema = new Schema({
  albumName: String,
  tags: String,
  albumDescription: String,
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  collectionObj: [{
    image: String,
    title: String,
    author: String
  }],
  albumComment: [{
    nameComment: String,
    commentary: String
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Collection = mongoose.model('Collection', collectionSchema);
module.exports = Collection;