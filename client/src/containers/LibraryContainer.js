import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trackListActions, playerActions } from '../actions';
import Library from '../components/Library';

const actions = { ...trackListActions, ...playerActions };

export class TrackListContainer extends Component {
	constructor(props) {
		super(props);
		this.props.getTracks();
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

  handleOrderBy(fieldName) {
    this.props.orderTracksByFieldValue(fieldName);
  }

	componentDidCatch(error, info) {
    console.log('componentDidCatch, error', error)
  }

	render() {
		const { library } = this.props;

		return(
			<Library 
        library={library} 
        handleUploadTracks={this.handleUploadTracks.bind(this)} 
        handleOrderBy={this.handleOrderBy.bind(this)}
      /> 
		)
	}
}

const mapStateToProps = state => {
	return {
		library: state.library,
	}
}

export default connect(mapStateToProps, actions)(TrackListContainer);
