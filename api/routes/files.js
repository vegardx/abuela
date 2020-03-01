const express = require('express');
const router = express.Router();
const path = require("path");

const baseroot = path.join(__dirname.replace('/api', '') , '../');

router.get('/photos/:photo', (req, res) => {
    res.sendFile(path.join(`${baseroot}/photos/${req.params.photo}`));
});

module.exports = router;
