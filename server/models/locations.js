const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  author: String,
  rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
  },
  reviewText: String,
  createdOn: {
      type: Date,
      "default": Date.now
  }
});

const openingTimeSchema = new Schema({
  days: {
      type: String,
      required: true
  },
  opening: String,
  closing: String,
  closed: {
      type: Boolean,
      required: true
  }
});

const locationSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  address: String,
  rating: {
      type: Number,
      "default": 0,
      min: 0,
      max: 5
  },
  facilities: [String],
  // Always store coordinates longitude, latitude order.
  coords: {
      type: [Number],
      index: '2dsphere'
  },
  openingTimes: [openingTimeSchema],
  reviews: [reviewSchema]
});

module.exports = mongoose.model('Location', locationSchema);