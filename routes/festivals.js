const express = require('express');
const Festival = require('../models/Festival');

const router = express.Router();

const verify = require('./verify');

//Get All Festivals
router.get('/', async (req,res) => {  //the verify middleware, use the function in verify, to check if the token is O.K., not K.O.
    try{
        const festivals = await Festival.find();    // here, we choose to Find so we get all festivals, but there are a lot of possibilities, Mongoose Methods
        res.json(festivals);
    }catch(err){
        res.json({message: err});
    }
});

//Get a Festival with an Id
/*router.get('/festival/:id', async (req,res) => {
    try{
        const festival = await Festival.findById(req.query.festivalId);
        res.json(festival);
    }catch(err){
        res.json({message: err })
    }    
});*/

//Post a Festival
router.post('/', async (req,res) => {
    const festival = new Festival({
        date: req.body.date,
        description: req.body.description
        // add espaces
    });
    try{
        const SavedFestival = await festival.save();
        res.json(SavedFestival);
    }catch(err){
        res.json({message: err });
    }
});

//Delete an Festival
router.delete('/:id', async (req,res) => {
    try{
        const removedFestival = await Festival.remove({_id: req.params.id});
        res.deleteOne(removedFestival);
        //supprimer les résa 
    }catch(err){
        res.json({message: err})
    }
});

module.exports = router