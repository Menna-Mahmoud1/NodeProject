const Plant = require('../models/plant');

 
exports.createPlant = async (req, res) => {
  try {
    const plant = await Plant.create(req.body);
    const { id, name, type, season, careInstructions } = plant;
    res.status(201).json({ id, name, type, season, careInstructions });
 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getPlants = async (req, res) => {
  try {
    const { name, season } = req.query;
    const filter = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (season) filter.season = new RegExp(season, 'i');

    const plants = await Plant.find(filter);
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.updatePlant = async (req, res) => {

  try {

    const id = req.query.id;

    if (!id) return res.status(400).json({ error: 'Missing id in query' });
 
    const plant = await Plant.findOneAndUpdate({ id }, req.body, { new: true });
 
    if (!plant) return res.status(404).json({ error: 'Plant not found' });
 
    res.json(plant);

  } catch (err) {

    res.status(400).json({ error: err.message });

  }

};

 
exports.deletePlant = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: 'Missing id in query' });
 
    const plant = await Plant.findOneAndDelete({ id });
 
    if (!plant) return res.status(404).json({ error: 'Plant not found' });
 
    res.json({ message: 'Plant deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.viewPlantingSchedules = async (req, res) => {
  try {
    const plants = await Plant.find();
 
    if (plants.length === 0) {
      return res.status(200).json({ message: 'No plants found.' });
    }
 
    const schedule = {};
 
  
    plants.forEach((p) => {
      const season = p.season || 'Unknown';
      if (!schedule[season]) {
        schedule[season] = [];
      }
      schedule[season].push(p.name);
    });
 
    res.status(200).json({
      message: '🌿 Planting Schedules',
      schedule
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
