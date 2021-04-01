const express = require('express');
const User = require('../models/User');

const router = express.Router();

//Get All Users
router.get('/', async (req,res) => {
    try{
        const users = await User.find();
        res.json(users)
    }catch(err){
        res.json({message: err})
    }
});

//Delete a User
router.delete('/:id', async (req,res) => {
    try{
        const removedUser = await User.remove({_id: req.params.id});
        res.deleteOne(removedUser);
        console.log('on a supp')
    }catch(err){
        res.json({message: err})
    }
});

module.exports = router