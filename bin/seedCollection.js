const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Collection = require("../models/Collection")

const bcryptSalt = 10;

const collection = [{
  albumName: "Flower",
  tags: "#flowers",
  albumDescription: "Very pretty thank you very well fandango",
  userId: { _id: "5c86af5a4c0292532fd6a9ee" },
  ArtpieceId: [],
  albumComment: [{
    nameComment: String,
    commentary: String
  }]},
  {
    albumName: "Flower2",
    tags: "#flowerss",
    albumDescription: "Very pretty thank you very well fandangox2",
    userId: { _id: "5c86af5a4c0292532fd6a9ee" },
    ArtpieceId: [],
    albumComment: [{
      nameComment: String,
      commentary: String
    }]
}]
mongoose
  .connect('mongodb://localhost/rijksmuseum', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });



//5c86af5a4c0292532fd6a9ee

Collection.deleteMany()
.then(() => {
  return Collection.create(collection)
})
.then(collectionCreated => {
  console.log(`${collectionCreated.length} collections created with the following id:`);
  console.log(collectionCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})