var dbController = require('../controllers/database.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/')
    .get(dbController.ping);

module.exports = router;