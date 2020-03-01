import React, { Component } from "react";
import PhotoService from "../services/photos";
import { ImageCache } from "react-preload";

class ViewerPage extends Component {
    constructor(props) {
        super(props);

        this.photoService = new PhotoService();
        this.state = {
            selected: null
        };
    }

    componentDidMount() {
        this.fetchActive();
        setInterval(this.fetchActive, 500);

        setTimeout(() => {
            this.photoService.getAll().then(res => {
                res.data.forEach(photo => {
                    ImageCache.add(photo.url);
                });
            });
        }, 3000);
    }

    fetchActive = () => {
        this.photoService.getSelected().then(res => {
            this.setState({
                selected: res.data
            });
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
