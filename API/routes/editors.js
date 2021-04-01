const express = require('express');
const Editor = require('../models/Editor');

const router = express.Router();

const verify = require('./verify');

//Get All Editors
router.get('/', async (req,res) => {  //the verify middleware, use the function in verify, to check if the token is O.K., not K.O.
    try{
        const editors = await Editor.find();    // here, we choose to Find so we get all editors, but there are a lot of possibilities, Mongoose Methods
        res.json(editors);
    }catch(err){
        res.json({message: err});
    }
});

//Post an Editor
router.post('/', async (req,res) => {
    console.log("Req : "+req.body)
    const editor = new Editor({
        name: req.body.name,
        address: req.body.address,
        contact: req.body.contact,
        exhibitor: req.body.exhibitor
    });
    
    console.log(editor)

    try{
        const SavedEditor = await editor.save();
        res.json(SavedEditor);
    }catch(err){
        res.json({message: err });
    }
});

//Get All Exhibitors
router.get('/exhibitors', async (req,res) => {  //the verify middleware, use the function in verify, to check if the token is O.K., not K.O.
    try{
        const editors = await Editor.find({exhibitor: true});    // here, we choose to Find editors with Exhibitor at true, it's mean they are "exposant"
        res.json(editors);
    }catch(err){
        res.json({message: err});
    }
});

// Get one editor by id
router.get('/details/:id', async (req,res) => {
    try{
        const editor = await Editor.findById(req.params.id);
        res.json({
            editor: editor,
        });
    }catch(err){
        res.json({message: err })
    }
});

//Delete an Editor
router.delete('/:id', async (req,res) => {
    try{
        const removedEditor = await Editor.remove({_id: req.params.id});
        res.deleteOne(removedEditor);
    }catch(err){
        res.json({message: err})
    }
});


module.exports = router