const express = require('express');
const router = express.Router();
const axios = require('axios')
const Collection = require("../models/Collection")
const Artpiece = require('../models/Artpiece')

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

/* GET home page */
router.get('/', (req, res, next) => {
    const values = ['van gog', 'steen', 'Jean Baptiste', 'rubens',
        'Hendrick Avercamp', 'Karel Appel', 'Pieter Aersen', 'Gerrit Adriaensz Berckheyde',
        'Jan Davidsz de Heem', 'Frans Hals'
    ];

    const toSend = values[Math.floor(Math.random() * values.length)]

    axios.get(`https://www.rijksmuseum.nl/api/en/collection?key=VYUGobm8&format=json&q=${toSend}&ps=6`)
        .then(response => {
            Collection.find()
                .populate("userId")
                .then(album => {
                    res.render('index', { 'data': shuffle(response.data.artObjects), album })
                })
                .catch(err => console.log(err))

        })

    .catch(err => console.log(err))
})

router.get('/artpiece/:id', (req, res, next) => {
    axios.get(`https://www.rijksmuseum.nl/api/en/collection/${req.params.id}?key=VYUGobm8&format=json`)
        .then(response => {

            Collection.find({ userId: req.session.passport.user })
                .then(collection => {
                    res.render('artpiece', { 'data': response.data.artObject, collection })
                })
                .catch(err => console.log(err))

        })
        .catch(err => console.log(err))

})



module.exports = router;