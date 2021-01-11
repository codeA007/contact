const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        default: 'personal'
    }
}, { timestamps: true });

module.exports = mongoose.model('contact', contactSchema)