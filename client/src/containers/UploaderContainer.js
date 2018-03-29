import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/uploaderActions';
import Uploader from '../components/Uploader';

export class UploaderContainer extends Component {
	handleUploadTrack(data) {
		let formData = new FormData();
		formData.append('trackName', data.trackName);
		formData.append('selectedFile', data.selectedFile);

		this.props.uploadTrack(formData);
	}

	render() {
		return (
			<Uploader handleUploadTrack={this.handleUploadTrack.bind(this)} />
		);
	}
}

const mapStateToProps = state => {
	return {
		// TODO: uploader reducer needs to be created (not yet used)
		uploader: state.uploader
	}
}

export default connect(mapStateToProps, actions)(UploaderContainer);