const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const { ethers } = require('ethers');


// simple read endpoints
router.get('/packages/:id', async (req, res) => {
const id = parseInt(req.params.id, 10);
const pkg = await Package.findOne({ tokenId: id });
if (!pkg) return res.status(404).json({ error: 'Not found' });
res.json(pkg);
});


router.post('/packages', async (req, res) => {
// create off-chain record after mint
const { tokenId, metadataURI, donor } = req.body;
const pkg = new Package({ tokenId, metadataURI, donor, logs: [{ status: 'Created', timestamp: new Date() }] });
await pkg.save();
res.json(pkg);
});


router.post('/packages/:id/log', async (req, res) => {
const id = parseInt(req.params.id, 10);
const { status, note } = req.body;
const pkg = await Package.findOne({ tokenId: id });
if (!pkg) return res.status(404).json({ error: 'Not found' });
pkg.logs.push({ status, timestamp: new Date(), note });
await pkg.save();
res.json(pkg);
});


module.exports = router;
