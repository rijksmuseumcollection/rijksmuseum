const express = require('express')
const router  = express.Router()

const Collection = require('../models/Collection')
const User = require('../models/User')
const Artpiece = require('../models/Artpiece')

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.render('auth/login', { message: "Hey! join us to create your album :D"})

  }
}

router.post("/", (req,res) => {
  res.render("index")
})


router.post("/delete/:id", (req, res) => {
  Collection.findOneAndDelete({ _id: req.params.id})
    .then(data => {res.redirect("/")})
    .catch(err => console.log(err))

})

router.get('/create', ensureAuthenticated, (req,res,next) => {
  
  res.render("albums/create")

})

router.post('/create', ensureAuthenticated, (req,res,next) => {

  const {albumName, tags, description} = req.body

  
  const collection = new Collection ({
    albumName,
    tags,
    albumDescription: description,
    userId : req.session.passport.user
  })

  collection.save()
    .then(data => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/showAllAlbums/:id', (req, res, next) => {
  Collection.find({ "userId": req.params.id } )

  .then(album => {
          console.log(album)
          res.render("albums/showAllAlbums", { album })
      })
      .catch(err => console.log(err))

})

router.get('/showAlbum/:id'), (req,res,next) => {
  
  Artpiece.find({"collectionId": req.params.id}) 
      .then(artpiece => {
        res.render("albums/showAlbum", {artpiece})
      })      
      .catch(err => console.log(err))

}

module.exports = router