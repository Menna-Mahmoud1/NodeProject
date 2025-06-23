const express = require('express');
const router = express.Router();
const plantController = require('../Controllers/plantsController');

router.post('/register', plantController.createPlant);
router.get('/getPlants', plantController.getPlants);
router.put('/update', plantController.updatePlant);
router.delete('/delete', plantController.deletePlant);
router.get('/schedule', plantController.viewPlantingSchedules);
 module.exports = router;