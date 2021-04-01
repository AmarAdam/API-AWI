const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema({
    // table, demi-table, m2
    type: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    reservationId: {
        type: String,
        required: true
    },
    areaId: {
        type: String,
        required: true
    }    
});

module.exports = mongoose.model('Place', PlaceSchema);