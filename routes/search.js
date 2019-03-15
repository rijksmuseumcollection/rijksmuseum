const express = require('express')
const router = express.Router()
const axios = require('axios')


router.post('/', (req, res) => {
    const { search } = req.body
    axios.get(`https://www.rijksmuseum.nl/api/en/collection?key=VYUGobm8&format=json&q=${search}&ps=20`)
        .then(response => res.render('search', { response: response.data.artObjects }))
        .catch(err => console.log(err))
})

module.exports = router