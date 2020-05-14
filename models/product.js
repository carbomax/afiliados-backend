const mongoose = require('mongoose');
const { Schema } = mongoose;


const ProductSchema = new Schema({
  title: { type: String, required: true, unique: true},
  description: { type: String, required: true},
  price: { type: Number, required: true, default: 0},
  photo: { type: String, default: null},
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true}
})

module.exports = mongoose.model('Product', ProductSchema);