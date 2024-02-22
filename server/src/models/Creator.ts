import mongoose from 'mongoose';

const CreatorSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    socialMedias: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    category: {
        type: [String],
    },
    location: {
        city: { 
            type: String
        },
        country: {
            type: String
        }
    },
});

const Creator = mongoose.model('Creator', CreatorSchema);

export default Creator;