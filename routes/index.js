const express = require('express');
const router = express.Router();
const axios = require('axios')

/* GET home page */
router.get('/', (req, res, next) => {

    res.render('index')
        // axios.get("https://www.rijksmuseum.nl/api/en/collection?key=VYUGobm8&format=json&q=van+gogh") 
        //   .then(response => {console.log(response.data.artObjects); res.render('index', {'data': response.data.artObjects})})
        //   .catch(err => console.log(err))
});


//ruta para artpiece.hbs
Router.post('/artpiece')

module.exports = router;