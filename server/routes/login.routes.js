var dbController = require('../controllers/database.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/:member')
    .get(dbController.checkMember);

router.param('member', dbController.getMember);

module.exports = router;