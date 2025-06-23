const Harvest = require('../models/harvest');
const Gardener = require('../models/gardener');
const Plant = require('../models/plant');
 
exports.createHarvest = async (req, res) => {
  try {
    const { gardenerId, plantId, quantity } = req.body;
    if (!gardenerId || !plantId || !quantity) {
      return res.status(400).json({
        success: false,
        error: 'gardenerId, plantId, and quantity are all required'
      });
    }
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantity must be a positive number'
      });
    }
    const [gardener, plant] = await Promise.all([
      Gardener.findOne({ id: gardenerId }).select('-_id id name'),
      Plant.findOne({ id: plantId }).select('-_id id name')
    ]);
    if (!gardener) {
      return res.status(404).json({
        success: false,
        error: 'Gardener not found'
      });
    }
    if (!plant) {
      return res.status(404).json({
        success: false,
        error: 'Plant not found'
      });
    }
 
    const harvest = await Harvest.create({
      gardenerId,
      gardenerName: gardener.name,
      plantId,
      plantName: plant.name,
      quantity,
      date: new Date()
    });
 
    const harvestObj = harvest.toObject();
    delete harvestObj._id;
 
    const response = {
      success: true,
      harvest: {
        id: harvestObj.id,
        gardener: {
          id: gardener.id,
          name: gardener.name
        },
        plant: {
          id: plant.id,
          name: plant.name
        },
        quantity: harvestObj.quantity,
        date: harvestObj.date
      }
    };
    res.status(201).json(response);
  } catch (err) {
    console.error('Harvest creation error:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};
 
exports.getHarvestsByGardener = async (req, res) => {
  try {
    const { id: gardenerId } = req.query;
    if (!gardenerId) {
      return res.status(400).json({
        success: false,
        error: "Gardener ID is required as a query parameter"
      });
    }
    const harvests = await Harvest.find({ gardenerId })
      .select('-_id -__v')
      .lean();
    if (!harvests || harvests.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No harvests found for this gardener"
      });
    }
    res.json({
      success: true,
      count: harvests.length,
      harvests
    });
  } catch (err) {
    console.error('Error fetching harvests:', err);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};
 
 
exports.generateHarvestReport = async (req, res) => {
  try {
    const harvests = await Harvest.find()
      .sort({ date: -1 })
      .lean()
      .then(results => results.map(({ _id, __v, ...rest }) => rest));
    if (harvests.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No harvest data found',
        data: []
      });
    }
    const stats = {
      totalHarvests: harvests.length,
      totalQuantity: harvests.reduce((sum, h) => sum + h.quantity, 0),
      uniquePlants: new Set(harvests.map(h => h.plantId)).size,
      uniqueGardeners: new Set(harvests.map(h => h.gardenerId)).size,
      dateRange: {
        first: harvests[harvests.length-1].date,
        last: harvests[0].date
      }
    };
    res.status(200).json({
      success: true,
      message: '🌱 Complete Harvest Report',
      stats,
      harvests: harvests.map(h => ({
        id: h.id,
        date: h.date,
        quantity: h.quantity,
        plant: { id: h.plantId, name: h.plantName },
        gardener: { id: h.gardenerId, name: h.gardenerName }
      }))
    });
  } catch (err) {
    console.error('Report error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};
 
 