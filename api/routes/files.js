const express = require('express');
const router = express.Router();
const path = require("path");

const baseroot = path.join(__dirname.replace('/api', '') , '../');

router.get('/photos/view/*', (req, res) => {
    res.sendFile(path.join(`${baseroot}/photos/${req.params[0]}`));
});

router.get("/*", (req, res) => {
    let url = req.url.replace(/^\/c\//g, '/');

    if (url.match(/\./)) {
        res.sendFile(path.join(baseroot + "/client/build/" + url));
    }
    else {
        res.sendFile(path.join(baseroot + "/client/build/index.html"));
    }
});

module.exports = router;
