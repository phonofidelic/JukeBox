import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trackListActions, playerActions } from '../actions';
import TrackList from '../components/TrackList';

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

	// componentDidMount() {
	// 	document.addEventListener('library-updated', e => {
	// 		console.log('library-update, e:', e);
	// 		this.props.getTracks();
	// 	})
	// }

	componentDidCatch(error, info) {
    console.log('componentDidCatch, error', error)
  }

	render() {
		const { trackList } = this.props;

		return(
			<TrackList trackList={trackList} handleUploadTracks={this.handleUploadTracks.bind(this)} /> 
		)
	}
}

const mapStateToProps = state => {
	return {
		trackList: state.trackList
	}
}

export default connect(mapStateToProps, actions)(TrackListContainer);