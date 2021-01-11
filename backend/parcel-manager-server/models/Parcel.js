const { URITooLong } = require('http-errors');
const mongoose = require('mongoose');

const ParcelSchema = mongoose.Schema({
    uid: String,
    type: String,
    crs: Object,
    properties: Object,
    geometry: Object,
    data: Array
})

module.exports = mongoose.model('Parcels', ParcelSchema);