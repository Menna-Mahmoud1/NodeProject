const mongoose = require('mongoose');
 
const plantSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['vegetable', 'fruit', 'herb'], required: true },
  season: { type: String, required: true },
  careInstructions: { type: String }
}, {
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;    
    }
  }
});
 
module.exports = mongoose.model('Plant', plantSchema);
 
 
 
 
 
 