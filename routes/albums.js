const express = require('express');
const router = express.Router();
const axios = require('axios')

const User = require('../models/User')
const Collection = require('../models/Collection')

// muestra todos los albumes de una persona
router.get('/showAllAlbums/:id', (req, res, next) => {
    Collection.find({ "userId": req.params.id } )

    .then(album => {
            console.log(album)
            res.render("albums/showAllAlbums", { album })
        })
        .catch(err => console.log(err))

})

module.exports = router;