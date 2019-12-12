var dbController = require('../controllers/database.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/:member')
    .post(dbController.addMember);

router.param('member', dbController.getMember);

module.exports = router;