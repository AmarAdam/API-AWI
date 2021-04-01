const express = require('express');
const Game = require('../models/Game');

const router = express.Router();

//Get All Games
router.get('/', async (req,res) => {  //the verify middleware, use the function in verify, to check if the token is O.K., not K.O.
    try{
        const games = await Game.find();    // here, we choose to Find so we get all editors, but there are a lot of possibilities, Mongoose Methods
        res.json(games);
    }catch(err){
        res.json({message: err});
    }
});

//Post a Game
router.post('/', async (req,res) => {
    
    console.log("on est dans la route");
    
    const game = new Game({
        name: req.body.name,
        description: req.body.description,
        editorId: req.body.editorId,
        editorName: req.body.editorName
    });

    console.log(game);
        
    try{
        const SavedGame = await game.save();
        res.json(SavedGame);
    }catch(err){
        res.json({message: err });
    }
});

// Get one game by id
router.get('/details/:id', async (req,res) => {
    try{
        const game = await Game.findById(req.params.id);
        res.json({
            game: game,
        });
    }catch(err){
        res.json({message: err })
    }
});

//Delete an Game
router.delete('/:id', async (req,res) => {
    try{
        const removedGame = await Game.remove({_id: req.params.id});
        res.deleteOne(removedGame);
    }catch(err){
        res.json({message: err})
    }
});

module.exports = router