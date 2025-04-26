const mongoose = require("mongoose")

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        requried: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
    },
}, { timestamps: true });

module.exports = mongoose.model("club",clubSchema);