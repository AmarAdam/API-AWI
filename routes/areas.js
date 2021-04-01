const express = require('express');
const Area = require('../models/Area');
const Game = require('../models/Game');
const Editor = require('../models/Editor');

const router = express.Router();

//Get All Areas
router.get('/', async (req,res) => {
    try{
        const areas = await Area.find();
        res.json(areas);
    }catch(err){
        res.json({message: err});
    }
});

//Post an Area
router.post('/', async (req,res) => {
    console.log(req.body)
    const area = new Area({
        number: req.body.number,
        description: req.body.description,
        size: req.body.size,
        sizeAvailable: req.body.size,
        price: req.body.price, // price for m²
        festivalId: req.body.festivalId
    });
        
    try{
        const SavedArea = await area.save();
        res.json(SavedArea);
    }catch(err){
        res.json({message: err });
    }
});

//Get All Areas for one festival
router.get('/festival', async (req,res) => {
    try{
        const areas = await Area.find({festivalId: req.query.festivalId});
        res.json(areas);
    }catch(err){
        res.json({message: err});
    }
});

//Delete an areas
router.delete('/:id', async (req,res) => {
    try{
        const removedArea = await Area.remove({_id: req.params.id});
        res.deleteOne(removedArea);
    }catch(err){
        res.json({message: err})
    }
});

module.exports = router