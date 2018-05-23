const Location = require('../../models/locations');

const theEarth = {
  earthRadius = 6371,
  getDistanceFromRads(rads) {
    return parseFloat(rads * this.earthRadius);
  },
  getRadsFromDistance(distance) {
    return parseFloat(distance / this.earthRadius);
  }
};

module.exports = {
  async getAllLocations(req, res) {
    const locations = await Location.find({});
    res.json(locations);
  },
  async getLocation(req, res) {
    const location = await Location.findById(req.params.id);
    if (!location) res.status(404).json({ message: "Location not found" });
    else res.json(location);
  },
  /*async getLocationsByDistance(req, res) {
    const lng = parseFloat(req.params.lng);
    const lat = parseFloat(req.params.lat);
    const maxDistance = parseFloat(req.query.maxDistance);
    const point = {
      type: "Point",
      coordinates: [lng, lat]
    };
    const geoOptions = {
      near: [lng, lat],
      maxDistance: theEarth.getRadsFromDistance(maxDistance),
      limit: 10
    };
    if (!lng || !lat || !maxDistance) {
      res.status(404).json({ message: "lng, lat and maxDistance query parameters are all required" });
    } else {
      try {
        const locations = await Location.geoSearch(point, geoOptions);
      } catch (error) {
        res.status(400).json(error);
      }
      
    }
    Loc.geoNear(point, geoOptions, function (err, results, stats) {
      var locations;
      console.log('Geo Results', results);
      console.log('Geo stats', stats);
      if (err) {
        console.log('geoNear error:', err);
        sendJSONresponse(res, 404, err);
      } else {
        locations = buildLocationList(req, res, results, stats);
        sendJSONresponse(res, 200, locations);
      }
    });
  },*/
  async addLocation(req, res) {
    const location = new Location({
      name: req.body.name,
      address: req.body.address,
      facilities: req.body.facilities.split(","),
      coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
      openingTimes: [{
        days: req.body.days1,
        opening: req.body.opening1,
        closing: req.body.closing1,
        closed: req.body.closed1,
      }, {
        days: req.body.days2,
        opening: req.body.opening2,
        closing: req.body.closing2,
        closed: req.body.closed2,
      }]
    });
    try {
      await location.save();
      res.status(201).json(location);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async updateLocation(req, res) {
    const location = await Location.findById(req.params.id);
    if (!location) res.status(404).json({ message: "Location not found" });
    else {
      location.name = req.body.name;
      location.address = req.body.address;
      location.facilities = req.body.facilities.split(",");
      location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
      location.openingTimes = [{
        days: req.body.days1,
        opening: req.body.opening1,
        closing: req.body.closing1,
        closed: req.body.closed1,
      }, {
        days: req.body.days2,
        opening: req.body.opening2,
        closing: req.body.closing2,
        closed: req.body.closed2,
      }];
      try {
        await location.save();
        res.json(location);
      } catch (error) {
        res.status(400).json(error);
      }
    }
  },
  async deleteLocation(req, res) {
    try {
      const location = await Location.findByIdAndRemove(req.params.id);
      res.status(204).json({ message: "Location deleted" });
    } catch (error) {
      res.status(404).json(error);
    }
  }
}