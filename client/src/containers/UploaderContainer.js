import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/uploader.actions';
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
    console.log('inputData', inputData)
    let formData = new FormData();
    // Object.keys(inputData).forEach(key => {
    //   this.removePreviewsFromFiles(inputData[key]);
    //   formData.append(`${key}[]`, inputData[key]);
    // });

    if (!inputData.audioFiles) return console.log('* no input data *');
    inputData.audioFiles.forEach(file => {
    	window.URL.revokeObjectURL(file.preview);
      file.preview = 'preview removed';
    	formData.append('audioFiles', file);
    })

    // Dispatch POST action:
    console.log('POST formData:', formData.getAll('audioFiles'));
    console.log('inputData:', inputData);

    this.props.uploadTracks(formData);
  }

	render() {
		return (
			<Uploader handleUploadTracks={this.handleUploadTracks.bind(this)} />
		);
	}
}

const mapStateToProps = state => {
	return {
		// TODO: uploader reducer needs to be created (not yet used)
		uploader: state.uploader,
	}
}

export default connect(mapStateToProps, actions)(UploaderContainer);
