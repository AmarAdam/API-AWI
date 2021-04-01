const mongoose = require('mongoose');

const BillSchema = mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: false
    },
    //POUR SAVE AVEC ID
    reservationId: {
        type: String,
        required: true
    },
    festivalName: {
        type: String
    }
});

module.exports = mongoose.model('Bill', BillSchema);