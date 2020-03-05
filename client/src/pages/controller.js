import React, { Component } from "react";
import PhotoService from "../services/photos";
import classNames from "classnames";
import { Link } from "react-router-dom";

class ControllerPage extends Component {
    constructor(props) {
        super(props);

        this.photoService = new PhotoService();
        this.state = {
            photos: [],
            albums: [],
            selected: null,
            currentAlbum: this.props.match.params.album
        };
    }

    componentDidMount() {
        this.fetchPhotos();
    }

    fetchPhotos = () => {
        const currentAlbum = this.props.match.params.album;

        this.setState({
            currentAlbum: currentAlbum
        });

        this.photoService.getAll(currentAlbum).then(res => {
            this.setState({
                albums: res.data.albums,
                photos: res.data.files,
                selected: res.data.files.find(photo => photo.selected)
            });
        });
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.album !== prevProps.match.params.album) {
            this.fetchPhotos();
        }
    }

    selectFile = (photo) => {
        this.setState({
            selected: photo
        });

        this.photoService.setSelected(photo);
    };

    getOneLevelUp = () => {
        const { currentAlbum } = this.state;
        let path = currentAlbum.split('/');
        path.pop();
        return path.length === 0 ? '' : path.join('/');
    };

    render() {
        const { albums, photos, selected, currentAlbum } = this.state;

        return (
            <div className="controller-page">
                <div className="grid-container">
                    <div className="grid-y grid-padding-x grid-padding-y">
                        <div className="cell shrink albums">
                            <div className="grid-x grid-margin-x grid-margin-y small-up-2 medium-up-4">
                                {currentAlbum && currentAlbum !== '' && (
                                    <div className="cell">
                                        <Link className="album" to={`/controller/${this.getOneLevelUp()}`}>
                                            ... back
                                        </Link>
                                    </div>
                                )}
                                {albums.length > 0 && albums.map((album, index) => (
                                    <div className="cell" key={`album-${album}`}>
                                        <Link className="album" to={`/controller/${currentAlbum ? [currentAlbum, album].join('/') : album}`}>
                                            {album}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="cell auto active">
                            <div className="grid-y grid-padding-x grid-padding-y active-inner">
                                <div className="cell auto small-10-centered text-center">
                                    {selected && (
                                        <img src={selected.url} alt={`Active/selected`} />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="cell auto thumbs">
                            <div className="grid-x grid-padding-x grid-padding-y">
                                {photos.map((photo, index) => (
                                    <div
                                        key={`photo-${index}`}
                                        onClick={() => this.selectFile(photo)}
                                        className={classNames("small-3", "cell", {
                                            "selected": selected === photo
                                        })}
                                    >
                                        <div className="thumb-wrapper">
                                            <img
                                                className={selected === photo ? "selected" : ""}
                                                onClick={() => this.selectFile(photo)}
                                                src={photo.url}
                                                alt={photo}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ControllerPage;
