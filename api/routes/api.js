const express = require('express');
const router = express.Router();


const photosController = require('../controllers/photos');

router.get('/photos', photosController.getPhotos);
router.get('/photos/active', photosController.getActivePhoto);
router.post('/photos/active', photosController.setActivePhoto);

module.exports = router;
