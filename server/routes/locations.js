const router = require('express').Router();
const { locationInfo, addReview } = require('../controllers/locations');

router.get('/', locationInfo);
router.get('/review/new', addReview);

module.exports = router;