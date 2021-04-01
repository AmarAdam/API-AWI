const mongoose = require('mongoose');

const EditorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 0, 
        max: 255
    },    
    exhibitor: {
        type: Boolean,
        required: true
    },
    address: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    contact: {
        type: String,
        required: true,
        min: 0,
        max: 255
    }
});

module.exports = mongoose.model('Editor', EditorSchema);