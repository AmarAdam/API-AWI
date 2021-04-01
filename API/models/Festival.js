const mongoose = require('mongoose');

//POUR IMBRICATION
//var  Reservation = mongoose.model('Reservation').schema;

const FestivalSchema = mongoose.Schema({
    date: {
        type: String,
        required: true,
        min: 4,
        max: 10
    },
    description: {
        type: String,
        required: true,
        min: 4,
        max: 10
    },
    currentfestival: {
        type: Boolean,
        required: false
    }
    //POUR IMBRICATION
    /*reservations: { 
        type:[Reservation]
    }*/
});

module.exports = mongoose.model('Festival',FestivalSchema);