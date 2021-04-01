const express = require('express');
const Collection = require('../models/Collection');

const router = express.Router();

const verify = require('./verify')

//Get All Collections 
router.get('/', async (req,res) => {  //the verify middleware, use the function in verify, to check if the token is O.K., not K.O.
    try{
        const collections = await Collection.find();    // here, we choose to Find so we get all collections, but there are a lot of possibilities, Mongoose Methods
        res.json(collections);
    }catch(err){
        res.json({message: err});
    }
});

//Post a Collection
router.post('/', verify, async (req,res) => {
    const collection = new Collection({
        name: req.body.name,
        watch1: req.body.watch1,
        watch2: req.body.watch2
    });
    
    try{
        const SavedCollection = await collection.save();
        res.json(SavedCollection);
    }catch(err){
        res.json({message: err });
    }

});

//Get a Collection with an Id
router.get('/:collectionId', async (req,res) => {
    try{
        const collection = await Collection.findById(req.params.collectionId);
    res.json(collection);
    }catch(err){
        res.json({message: err })
    }    
});

//Delete a Collection
router.delete('/:collectionId', async (req,res) => {
    try{
        const removedCollection = await Collection.remove({_id: req.params.collectionId});
        res.deleteOne(removedCollection);
    }catch(err){
        res.json({message: err})
    }
});

//Update a Collection
router.patch('/:collectionId', async (req, res) => {
    try{
        const updateCollection = await Collection.updateOne(
            { _id: req.params.collectionId},
            { ...req.body, _id : req.params.collectionId} 
        )
        res.json(updateCollection);
    }catch(err){
        res.json({message: err})
    }
});

module.exports = router