const mongoose = require('mongoose');

const SocialMediaSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'creator',
    },
    followers: {
        type: Number,
    },
    //To be continued...
});

module.exports = SocialMedia = mongoose.model('socialMedia', SocialMediaSchema);