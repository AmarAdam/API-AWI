const express = require('express');
const Festival = require('../models/Festival');
const Reservation = require('../models/Reservation');
const Area = require('../models/Area');

const router = express.Router();

const verify = require('./verify');

// Get one festival by id with reservations
router.get('/:id', async (req,res) => {
    try{
        const festival = await Festival.findById(req.params.id);
        const reservations = await Reservation.find({festivalId: req.params.id});
        const areas = await Area.find({festivalId: req.params.id});
        res.json({
            festival: festival,
            reservations: reservations,
            areas: areas
        });
    }catch(err){
        console.log(err)
        res.json({message: err })
    }
});

module.exports = router