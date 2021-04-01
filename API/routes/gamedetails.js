const express = require('express');
const Game = require('../models/Game');

const router = express.Router();

// Get one game by id
router.get('/:id', async (req,res) => {
    try{
        const game = await Game.findById(req.params.id);
        res.json({
            game: game,
        });
    }catch(err){
        res.json({message: err })
    }
});

module.exports = router