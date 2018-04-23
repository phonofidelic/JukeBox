import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/uploaderActions';
import Uploader from '../components/Uploader';

export class UploaderContainer extends Component {
	removePreviewsFromFiles(files) {
    // Remove preview for all files to prevent memory leaks:
    // https://github.com/react-dropzone/react-dropzone#word-of-caution-when-working-with-previews
    files.forEach(file => {
      window.URL.revokeObjectURL(file.preview);
      file.preview = 'preview removed';
    })
  }

  handleUploadTracks(inputData) {
    let formData = new FormData();
    Object.keys(inputData).forEach(key => {
      this.removePreviewsFromFiles(inputData[key]);
      formData.append(key, inputData[key]);
    });

    // Dispatch POST action:
    console.log('POST formData:', formData.getAll('files'));
    console.log('inputData:', inputData);
  }

	handleUploadTrack(data) {
		let formData = new FormData();
		formData.append('trackName', data.trackName);
		formData.append('selectedFile', data.selectedFile);

		this.props.uploadTrack(formData);
	}

	render() {
		return (
			<Uploader handleUploadTrack={this.handleUploadTrack.bind(this)} handleUploadTracks={this.handleUploadTracks.bind(this)} />
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