const express = require('express')
const router  = express.Router()

const Collection = require('../models/Collection')

router.post("/", (req,res) => {
  res.render("index")
})

router.post("/delete/:id", (req, res) => {

  Collection.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))

})

router.post("/delete/img/:id", (req, res) => {
  console.log(Collection)
  Collection.findOneAndDelete({ "collectionObj._id": req.params.id})
    .then(data => {console.log(data); res.redirect("/")})
    .catch(err => console.log(err))

})

module.exports = router