const Location = require('../models/locations');

module.exports = {
  async homeList(req, res) {
    const locations = await Location.find({});
    res.render('locations-list', {
      title: 'Loc8r - find a place to work with wifi',
      pageHeader: {
        title: 'Loc8r',
        strapline: 'Find places to work with wifi near you!'
      },
      sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
      locations
    });
  },
  async locationInfo(req, res) {
    try {
      const location = await Location.findById(req.params.id);
      res.render('location-info', {
        title: 'Starcups',
        pageHeader: {
          title: 'Starcups'
        },
        sidebar: {
          context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
          callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location
      });
    } catch (error) {
      res.status(404).send('Page not found!');
    }
  },
  addReview(req, res) {
    res.render('location-review-form', {
      title: 'Review Starcups on Loc8r',
      pageHeader: {
        title: 'Review Starcups'
      }
    });
  }
}