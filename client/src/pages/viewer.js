import React, { Component } from "react";
import PhotoService from "../services/photos";
import { ImageCache } from "react-preload";

class ViewerPage extends Component {
    constructor(props) {
        super(props);

        this.photoService = new PhotoService();
        this.state = {
            selected: null,
            currentAlbum: null,
        };
    }

    componentDidMount() {
        this.fetchActive();
        setInterval(this.fetchActive, 500);
    }

    fetchActive = () => {
        this.photoService.getSelected().then(res => {
            this.setState({
                selected: res.data
            });

            if (res.data.album !== this.state.currentAlbum) {
                this.setState({
                    currentAlbum: res.data.album
                });

                setTimeout(() => {
                    this.photoService.getAll(res.data.album).then(res => {
                        res.data.files.forEach(photo => {
                            ImageCache.add(photo.url);
                        });
                    });
                }, 1000);
            }
        });
    };

    render() {
        return (
            <div className="viewer-page" style={{
                backgroundImage: `url(${this.state.selected ? this.state.selected.url : ''})`
            }}></div>
        );
    }
}

export default ViewerPage;
