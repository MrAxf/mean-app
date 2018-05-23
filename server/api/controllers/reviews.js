const Location = require('../../models/locations');

const updateAverageRating = location => {
  if (location.reviews) {
    let ratingTotal = 0;
    for (let i = 0; i < location.reviews.length; i++) {
      ratingTotal = ratingTotal + location.reviews[i].rating;
    }
    location.rating = parseInt(ratingTotal / location.reviews.length, 10);
  }
}

module.exports = {
  async getReview(req, res) {
    const location = await Location.findById(req.params.locId);
    if (!location) res.status(404).json({ message: "Location not found" });
    else {
      const review = location.reviews.id(req.params.reviewid);
      if (!review) res.status(404).json({ message: "Review not found" });
      else res.json(review);
    }
  },
  async addReview(req, res) {
    const location = await Location.findById(req.params.locId);
    if (!location) res.status(404).json({ message: "Location not found" });
    else {
      try {
        location.reviews.push(req.body);
        updateAverageRating(location);
        await location.save();
        res.status(201).json(req.body);
      } catch (error) {
        res.status(400).json(error);
      }
    }
  },
  async updateReview(req, res) {
    const location = await Location.findById(req.params.locId);
    if (!location) res.status(404).json({ message: "Location not found" });
    else {
      try {
        const review = location.reviews.id(req.params.reviewid);
        if (!review) res.status(404).json({ message: "Review not found" });
        else {
          review.author = req.body.author;
          review.rating = req.body.rating;
          review.reviewText = req.body.reviewText;
          updateAverageRating(location);
          await location.save();
          res.json(review);
        }
      } catch (error) {
        res.status(400).json(error);
      }
    }
  },
  async deleteReview(req, res) {
    const location = await Location.findById(req.params.locId);
    if (!location) res.status(404).json({ message: "Location not found" });
    else {
      const review = location.reviews.id(req.params.reviewid);
      if (!review) res.status(404).json({ message: "Review not found" });
      else{
        review.remove();
        res.status(204).json({ message: "Review deleted" });
      }
    }
  },
}