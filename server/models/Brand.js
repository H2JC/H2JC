const mongoose = require('mongoose');

const BrandScheme = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    contactPersonName: {
        type: String,
        required: true,
    },
    contactEmail: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    industry: {
        type: String,
    },
    preferences: [
        String
    ]
});

module.exports = Brand = mongoose.model('brand', BrandScheme);