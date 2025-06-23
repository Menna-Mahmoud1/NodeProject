const express = require('express');
const router = express.Router();
const gardenerController = require('../controllers/gardenerController');

router.post('/register', gardenerController.createGardener);
router.put('/update', gardenerController.updateGardener);
router.delete('/delete', gardenerController.deleteGardener);
router.get('/getGardener', gardenerController.getGardeners);


module.exports = router;