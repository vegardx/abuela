const fs = require('fs');

let activePhoto = 0;

const readPhotos = () => {
    const folder = '../photos';
    const files = [];
    const urlPrefix = `${process.env.APP_URL}photos/`;

    fs.readdirSync(folder).forEach((file, index) => {
        files.push({
            id: index,
            url: `${urlPrefix}${file}`,
            selected: index === activePhoto
        });
    });

    return files;
};

const getById = (id) => {
    return readPhotos()[id];
};

const getPhotos = (req, res, next) => {
    res.send(readPhotos());
};

const setActivePhoto = (req, res, next) => {
    activePhoto = req.body.id;
    res.send(getById(activePhoto));
};

const getActivePhoto = (req, res, next) => {
    let photo = getById(activePhoto);
    res.send(photo);
};

module.exports = { getPhotos, setActivePhoto, getActivePhoto };
