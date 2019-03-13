const express = require('express');
const router = express.Router();
const axios = require('axios')
const Collection = require("../models/Collection")
const Artpiece = require('../models/Artpiece')

/* GET home page */
router.get('/', (req, res, next) => {
    axios.get("https://www.rijksmuseum.nl/api/en/collection?key=VYUGobm8&format=json&q=vermeer&&s=relevance")
        .then(response => {
            console.log(response.data.artObjects);
            res.render('index', { 'data': response.data.artObjects })
        })
        .catch(err => console.log(err))
})

//     Collection.find()
//         .then(test => res.render('index', {'data': test[0].collectionObj}))
//         .catch(err => console.log(err))
//         // axios.get("https://www.rijksmuseum.nl/api/en/collection?key=VYUGobm8&format=json&q=van+gogh") 
//         //   .then(response => {console.log(response.data.artObjects); res.render('index', {'data': response.data.artObjects})})
//         //   .catch(err => console.log(err))
// })

// router.get('/:id', (req, res, next) => {

//     Collection.findById(req.paramas.id)
//         .then(test => res.render('index', {test}))
//         .catch(err => console.log(err))
// });



// //ruta para renderizar artpiece.hbs
// router.get('/artpiece', (req, res, next) => {
//     axios.get("https://www.rijksmuseum.nl/api/en/collection?key=VYUGobm8&format=json&s=relevance")
//         .then(response => {
//             console.log(response.data.artObjects);
//             res.render('vista', { 'data': response.data.artObjects })
//         })
//         .catch(err => console.log(err))
// })

router.get('/artpiece/:id', (req, res, next) => {
    axios.get(`https://www.rijksmuseum.nl/api/en/collection/${req.params.id}?key=VYUGobm8&format=json`)
        .then(response => {
            console.log(response.data.artObject);
            res.render('artpiece', { 'data': response.data.artObject })
        })
        .catch(err => console.log(err))

})



module.exports = router;