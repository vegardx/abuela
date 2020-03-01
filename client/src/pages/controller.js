import React, { Component } from "react";
import PhotoService from "../services/photos";
import classNames from "classnames";

class ControllerPage extends Component {
    constructor(props) {
        super(props);

        this.photoService = new PhotoService();
        this.state = {
            photos: [],
            selected: null
        };
    }

    componentDidMount() {
        this.photoService.getAll().then(res => {
            this.setState({
                photos: res.data,
                selected: res.data.find(photo => photo.selected)
            });
        });
    }

    selectFile = (photo) => {
        this.setState({
            selected: photo
        });

        this.photoService.setSelected(photo.id);
    };

    render() {
        return (
            <div className="controller-page">
                <div className="grid-container">
                    <div className="grid-y grid-padding-x grid-padding-y">
                        <div className="cell small-6 active">
                            <div className="grid-x grid-padding-x grid-padding-y">
                                <div className="cell small-10-centered text-center">
                                    {this.state.selected && (
                                        <img src={this.state.selected.url}/>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="cell small-6 thumbs">
                            <div className="grid-x grid-padding-x grid-padding-y">
                                {this.state.photos.map((photo, index) => (
                                    <div
                                        key={`photo-${index}`}
                                        onClick={() => this.selectFile(photo)}
                                        className={classNames("small-3", "cell", {
                                            "selected": this.state.selected === photo
                                        })}
                                    >
                                        <div className="thumb-wrapper">
                                            <img
                                                className={this.state.selected === photo ? "selected" : ""}
                                                onClick={() => this.selectFile(photo)}
                                                src={photo.url}
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
