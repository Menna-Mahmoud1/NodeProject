const mongoose = require('mongoose');

 
const GardenerSchema =mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  age: Number,
  contact_Number: String,
  plotNumber: Number,
  preferredPlants: [{ type: String }]
}, {
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;     // Remove _id
      delete ret.__v;     // Optional: Remove version key
    }
  }
});
module.exports = mongoose.model('Gardener', GardenerSchema);