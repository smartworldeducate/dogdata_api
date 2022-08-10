import React, { Component } from "react";
import axios from "axios";

export default class DogImage extends Component {
    state = {
        image: "",
        loading: true
    };

    //Getting Image From Another API While Rendering The Search Result
    componentDidMount() {
        if (this.props.image) {
            axios.get("https://api.thedogapi.com/v1/images/" + this.props.image)
                .then(response => {
                    this.setState({ image: response.data.url, loading: false })
                });
        }else{
            this.setState({loading: false })
        }
    }

    render() {
        if(this.state.loading){
            return (
                <div className="card-img-top" style={{
                    backgroundImage: `url(./spinner.gif)`
                }}>
                </div>
            );
        }else{
            return (
                <div className="card-img-top" style={{
                    backgroundImage: `url(${(this.state.image ? this.state.image : "./no-image.jpg")})`
                }}>
                </div>
            );
        }
    }
}