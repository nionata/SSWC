var dbController = require('../controllers/database.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/sighting/:sighting')
    .post(dbController.newSighting)
    .delete(dbController.deleteSighting);

router.route('/flower/:flower/:updatedFlower')
    .put(dbController.updateFlower);

router.route('/flower/:flower')
    .get(dbController.recentSightings)
    .delete(dbController.deleteFlower);

router.route('/flower')
    .get(dbController.getFlowers);

// Flower param is URI encoded common name
// Sighting param is URI encoded NAME#PERSON#LOCATION#SIGHTED
// UpdatedFlower param is URI encoded GENUS#SPECIES#COMNAME
router.param('flower', dbController.getFlower);
router.param('sighting', dbController.getSighting);
router.param('updatedFlower', dbController.getUpdatedFlower);

module.exports = router;