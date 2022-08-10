import React, { Component } from "react";
import "./Dog.css";
import DogImage from "./DogImage";

export default class Dog extends Component {
	
	render() {
		return (
			<div className="col-lg-4 col-md-6 col-sm-12 col-xs-6 mb-5">
				<div className="card text-left h-100">
					<DogImage image={this.props.image}/>
					<div className="card-body">
						<h5 className="card-title">{this.props.name ? this.props.name : "Not Available"}</h5>
						<p className="card-text"><span>Breed:</span> {this.props.breed ? this.props.breed : "Not Available"}</p>
						<p className="card-text"><span>Breed For:</span> {this.props.breedFor ? this.props.breedFor : "Not Available"}</p>
						<p className="card-text"><span>Height:</span> {this.props.height ? this.props.height : "Not Available"}</p>
						<p className="card-text"><span>Life Span:</span> {this.props.lifeSpan ? this.props.lifeSpan : "Not Available"}</p>
						<p className="card-text"><span>Temperament:</span> {this.props.temperament ? this.props.temperament : "Not Available"}</p>
						<p className="card-text"><span>Origin:</span> {this.props.origin ? this.props.origin : "Not Available"}</p>
					</div>
				</div>
			</div>
		);
	}
}