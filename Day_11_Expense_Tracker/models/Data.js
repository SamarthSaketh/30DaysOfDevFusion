const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    Category: { type: String, required: true },
    Amount: { type: Number, required: true },
    Info: { type: String, required: true },
    Date: { type: Date, required: true },
});

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;
