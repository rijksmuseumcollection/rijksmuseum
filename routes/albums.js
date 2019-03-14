const express = require('express')
const router  = express.Router()
const axios   = require('axios')

const Collection = require('../models/Collection')
const User = require('../models/User')
const Artpiece = require('../models/Artpiece')
const mongoose = require("mongoose")


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
         
          res.render("albums/showAllAlbums", { album })
      })
      .catch(err => console.log(err))

})

router.get('/showAlbum/:id', (req,res,next) => {
  
    Artpiece.find({ collectionId : req.params.id})
      .populate("collectionId")
      .then( artpiece => {
        res.render("albums/showAlbum", { artpiece })    
      })      
      .catch(err => console.log(err))

})


router.post('/showAlbum/add/:id', (req, res, next) => {

  const collect = req.body.collect

axios.get(`https://www.rijksmuseum.nl/api/en/collection/${req.params.id}?key=VYUGobm8&format=json`)
      
    .then(response => {
        
        Collection.findOne({ "albumName" : collect})
        
        .then( collection => {
        
          const image = new Artpiece({
              
              image: response.data.artObject.webImage.url,
              title: response.data.artObject.title,
              apiId: response.data.artObject.objectNumber, 
              description: response.data.artObject.plaqueDescriptionEnglish,
              author: response.data.artObject.principalMakers[0].name,
              age: response.data.artObject.dating.presentingDate,
              technique: response.data.artObject.physicalMedium,
              collectionId: collection._id
              
            })
    
              image.save()
                .then(img => {

                  Collection.findByIdAndUpdate(collection._id, {image: response.data.artObject.webImage.url})
                    
                    .then(albumUpdated => res.redirect(`/artpiece/${req.params.id}`))
                    .catch(err => console.log(err))

                })
                .catch(err => console.log(err))
            })
        .catch(err => console.log(err))
  })

})



module.exports = router