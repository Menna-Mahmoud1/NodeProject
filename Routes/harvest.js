const express = require('express');
const router = express.Router();
const harvestController = require('../controllers/harvestController');

router.post('/create', harvestController.createHarvest);
router.get('/gardener', harvestController.getHarvestsByGardener);
router.get('/report', harvestController.generateHarvestReport);

module.exports = router;