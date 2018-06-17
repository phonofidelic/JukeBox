import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/uploader.actions';
import Uploader from '../components/Uploader';

export class UploaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      droppedFiles: [],
    }
  }

  handleOnDrop(files) {
    // return console.log('handleOnDrop, files:', files);
    this.setState({
      droppedFiles: [...this.state.droppedFiles, ...files]
    });
  }

	removePreviewsFromFiles(files) {
    // Remove preview for all files to prevent memory leaks:
    // https://github.com/react-dropzone/react-dropzone#word-of-caution-when-working-with-previews
    files.forEach(file => {
      window.URL.revokeObjectURL(file.preview);
      file.preview = 'preview removed';
    })
  }

	handleUploadTracks(inputData) {
    console.log('handleUploadTracks, inputData:', inputData)
    console.log('handleUploadTracks, droppedFiles:', this.state.droppedFiles)
    let formData = new FormData();
    // Object.keys(inputData).forEach(key => {
    //   this.removePreviewsFromFiles(inputData[key]);
    //   formData.append(`${key}[]`, inputData[key]);
    // });

    if (!this.state.droppedFiles) return console.log('* no input data *');
    this.state.droppedFiles.forEach(file => {
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
			<Uploader 
        handleUploadTracks={this.handleUploadTracks.bind(this)}
        handleOnDrop={this.handleOnDrop.bind(this)} 
        droppedFiles={this.state.droppedFiles}
      />
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
