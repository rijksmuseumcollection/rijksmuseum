const express = require('express')
const router  = express.Router()
const axios = require('axios')


router.post('/', (req, res) => {
  console.log("plain")
  const {search} = req.body
  console.log(search)
  axios.get(`https://www.rijksmuseum.nl/api/en/collection?key=VYUGobm8&format=json&q=${search}&ps=10`)
    .then(response => {console.log(response.data); res.render('search', {response: response.data.artObjects})})
    .catch(err => console.log(err))
})

module.exports = router