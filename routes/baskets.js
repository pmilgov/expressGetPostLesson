
const express = require('express')
const router = express.Router()

const fs = require('fs')

const baskets = JSON.parse(fs.readFileSync('baskets.json'))

router.get('/',(req, res) => res.send(baskets))

router.get('/:id',(req,res) => {
    console.log('*********************')
    console.log(req.params)
    console.log('*********************')
    
    const selectedBasket = baskets.find(basket => basket.id === Number(req.params.id))
     res.send(selectedBasket)
})

module.exports = router