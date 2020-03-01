import React, { Component } from "react";
import PhotoService from "../services/photos";

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
