const mongoose = require('mongoose');

const CollectionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    watch1: String, 
    watch2: String
});

module.exports = mongoose.model('Collections', CollectionSchema);
