const mongoose = require('mongoose');
//var Bill = mongoose.model('Bill').schema;

const ReservationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    //to keep the owner in the reservation
    festivalId: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    workflow: {
        type: String
    },
    // games id
    games: {
        type: [String]
    },
    /*bill: {
        type: String
        //type: Bill
    },*/
    exhibitor: {
        type: String
    },
    places: [],
    billPrice: {
        type: Number
    }

});

module.exports = mongoose.model('Reservation', ReservationSchema);
