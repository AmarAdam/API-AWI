const mongoose = require('mongoose');

const AreaSchema = mongoose.Schema({
    number: {
        type: Number
    },
    description: {
        type: String
    },
    size: {
        type: Number
    },
    sizeAvailable: {
        type: Number
    },
    price: {
        type: Number
    },
    festivalId: {
        type: String
    }
});

module.exports = mongoose.model('Area', AreaSchema);
