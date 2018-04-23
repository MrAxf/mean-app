const router = require('express').Router();
const { index, about } = require('../controllers/index');
const { homeList, locationInfo, addReview } = require('../controllers/locations');

/* GET home page. */
router.get('/', homeList);
router.get('/location/:id', locationInfo);
router.get('/location/review/new', addReview);

router.get('/about', about);

module.exports = router;
