const router = require('express').Router();
const { index, about } = require('../controllers/index');

/* GET home page. */
router.get('/', index);
router.get('/about', about);

module.exports = router;
