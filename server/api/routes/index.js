const router = require('express').Router();
const { getAllLocations, getLocation, addLocation, updateLocation, deleteLocation } = require('../controllers/locations');
const { getReview, addReview, updateReview, deleteReview } = require('../controllers/reviews');

router.get('/locations', getAllLocations);
//router.get('/locations/:lng/:lat', ctrlLocations.locationsListByDistance);
router.post('/locations', addLocation);
router.get('/locations/:id', getLocation);
router.put('/locations/:id', updateLocation);
router.delete('/locations/:id', deleteLocation);

// reviews
router.post('/locations/:locId/reviews', addReview);
router.get('/locations/:locId/reviews/:reviewid', getReview);
router.put('/locations/:locId/reviews/:reviewid', updateReview);
router.delete('/locations/:locId/reviews/:reviewid', deleteReview);