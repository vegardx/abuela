const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const photoDir = '../photos';
let activePhoto = {
    album: null,
    id: 0
};

const readPhotos = (album) => {
    const isDirectory = source => lstatSync(source).isDirectory();

    const files = [],
          albums = [];
    const urlPrefix = `${process.env.APP_URL}${join('photos', 'view', album || '')}/`;
    const currentFolder = join(photoDir, album || '');

    readdirSync(currentFolder).forEach((file, index) => {
        if (isDirectory(join(currentFolder, file))) {
            albums.push(file);
        } else {
            files.push({
                id: index,
                url: `${urlPrefix}${file}`,
                album: album,
                selected: index === activePhoto.id && album == activePhoto.album
            });
        }
    });

    return { files, albums };
};

const getById = (album, id) => {
    return readPhotos(album).files.find(photo => photo.id === id);
};

const getPhotos = (req, res, next) => {
    res.send(readPhotos(req.query.album));
};

const setActivePhoto = (req, res, next) => {
    activePhoto = { id, album } = req.body;
    res.send(getById(album, id));
};

const getActivePhoto = (req, res, next) => {
    let photo = getById(activePhoto.album, activePhoto.id);
    res.send(photo);
};

module.exports = { getPhotos, setActivePhoto, getActivePhoto };
