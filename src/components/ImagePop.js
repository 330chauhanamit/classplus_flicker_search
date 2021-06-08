import React, {Component} from "react";
import { imageurl } from "../requires";

export default class ImagePop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			metaData: false
		};
		this.onPhotoClick = this.onPhotoClick.bind(this);
	}

	onPhotoClick(evt) {
		evt.stopPropagation();
		this.setState({ metaData: !this.state.metaData });
	}

	render() {
		const { title, farm, server, id, secret } = this.props.image;
		console.log(title);
		return (
			<div className="image-popup-container" onClick={this.props.onHide}>
				<img
					className="popup-image"
					src={imageurl(farm, server, id, secret)}
					alt=""
					style={{ marginTop: "150px" }}
					onClick={this.onPhotoClick}
				/>
				{this.state.showMeta &&
					<ul className="image-metadata">
						<li style={{ margin: "5px 0" }}>
							Title: {title}
						</li>
						<li style={{ margin: "5px 0" }}>
							ImageId: {id}
						</li>
						<li style={{ margin: "5px 0" }}>
							FarmId: {farm}
						</li>
						<li style={{ margin: "5px 0" }}>
							ServerId: {server}
						</li>
						<li style={{ margin: "5px 0" }}>
							SecretId: {secret}
						</li>
					</ul>}
			</div>
		);
	}
}
