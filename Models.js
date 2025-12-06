const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PackageSchema = new Schema({
tokenId: { type: Number, required: true, unique: true },
metadataURI: String,
donor: String,
logs: [{ status: String, timestamp: Date, note: String }]
});


module.exports = mongoose.model('Package', PackageSchema);
