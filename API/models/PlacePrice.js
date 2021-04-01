const mongoose = require('mongoose');

const PlacePriceSchema = mongoose.Schema({
    label: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }, // label a utiliser en front
    type: {
        type: String, //table, demitable, m2
        required: true
    },
    price: {
        type: String,
        required: true
    } // prix pour ce type d'emplacement
});

module.exports = mongoose.model('PlacePrice', PlacePriceSchema);