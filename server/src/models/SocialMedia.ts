import mongoose from 'mongoose';

const SocialMediaSchema = new mongoose.Schema({
    creatorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'creator',
    },
    followers: {
        type: Number,
    },
    socialMediaType: {
        type: [String]
    },
    socialMediaHandle: {
        type: String
    },
    engagementData: {
        date: {
            type: Date
        },
        likes: {
            type: Number
        },
        comments: {
            type: Number    
        },
        shares: {
            type: Number
        },
        impressions: {
            type: Number
        }
    }
    //To be continued...
});

const SocialMedia = mongoose.model('SocialMedia', SocialMediaSchema);

export default SocialMedia;