const mongoose = require('mongoose');
 
const harvestSchema = new mongoose.Schema({
  gardenerId: {
    type: String,
    ref: 'Gardener',
    required: true
  },
  plantId: {
    type: String,
    ref: 'Plant',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  date: {
    type: Date,
    default: Date.now
  },
}, {
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;
    }
  }
 
});
 
module.exports = mongoose.model('Harvest', harvestSchema);
 
 