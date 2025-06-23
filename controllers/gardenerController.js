const Gardener = require('../models/gardener');

exports.createGardener = async (req, res) => {
  try {
    const gardener = await Gardener.create(req.body);
    res.status(201).json(gardener);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateGardener = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: 'Missing id in query' });
 
    const gardener = await Gardener.findOneAndUpdate({ id }, req.body, { new: true });
    if (!gardener) return res.status(404).json({ error: 'Gardener not found' });
 
    res.json(gardener);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
 
exports.deleteGardener = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: 'Missing id in query' });
 
    const gardener = await Gardener.findOneAndDelete({ id });
    if (!gardener) return res.status(404).json({ error: 'Gardener not found' });
 
    res.json({ message: 'Gardener deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.getGardeners = async (req, res) => {
  try {
    const { name, id } = req.query;
    const filter = {};
    if (name) filter.name = new RegExp(name, 'i'); 
    if (id) filter.id = id; 
    const gardeners = await Gardener.find(filter).populate('preferredPlants');
    res.json(gardeners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}