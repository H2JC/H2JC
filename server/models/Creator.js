const mongoose = require('mongoose');

const CreatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    social: {
        youtube: {
            type: String,
        },
        twitter: {
            type: String,
        },
        instagram: {
            type: String,
        },
        titok: {
            type: String,
        },
    },
    category: {
        type: [String],
    },
    location: {
        type: String,
    },
    engagementData: {
        //To be continued...
    },
});

module.exports = Creator = mongoose.model('creator', CreatorSchema);
