const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    //POUR SAVE AVEC ID
    reservationId: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }
});

module.exports = mongoose.model('Note', NoteSchema);