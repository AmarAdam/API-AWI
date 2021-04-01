const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6, 
        max: 255
    },
    notice: {
        type: String,
        required: false,
        min: 6, 
        max: 255
    },
    ageMin: {
        type: Number,
        required: false,
        min: 6, 
        max: 255
    },
    description: {
        type: String
    },
    //to keep the editor of the game
    editorId: {
        type: String,
        min: 6, 
        max: 255,
        required: true
    },
    editorName: {
        type: String
    }
});

module.exports = mongoose.model('Game', GameSchema);
