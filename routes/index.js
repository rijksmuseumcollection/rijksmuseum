const express = require('express');
const router = express.Router();
const axios = require('axios')
const Collection = require("../models/Collection")


router.get('/', (req, res, next) => {

    Collection.find()
        .then(test => res.render('index', {'data': test[0].collectionObj}))
        .catch(err => console.log(err))
        // axios.get("https://www.rijksmuseum.nl/api/en/collection?key=VYUGobm8&format=json&q=van+gogh") 
        //   .then(response => {console.log(response.data.artObjects); res.render('index', {'data': response.data.artObjects})})
        //   .catch(err => console.log(err))
})

router.get('/:id', (req, res, next) => {
    
    Collection.findById(req.paramas.id)
        .then(test => res.render('index', {test}))
        .catch(err => console.log(err))

})


module.exports = router;