import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/uploader.actions';
import Uploader from '../components/Uploader';
import Loader from '../components/Loader';
import ErrorMessageContainer from './ErrorMessageContainer';

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

  cleaeDroppedFiles() {
    this.setState({
      droppedFiles: []
    });
  }

  handleRemoveTrack(index) {
    const updatedFileList = [...this.state.droppedFiles];
    updatedFileList.splice(index, 1);
    this.setState({
      droppedFiles: updatedFileList
    });
  }

	handleUploadTracks() {
    console.log('handleUploadTracks, droppedFiles:', this.state.droppedFiles)
    let formData = new FormData();

    if (!this.state.droppedFiles) return console.log('* no input data *');

    // Remove preview for all files to prevent memory leaks:
    // https://github.com/react-dropzone/react-dropzone#word-of-caution-when-working-with-previews
    this.state.droppedFiles.forEach(file => {
    	window.URL.revokeObjectURL(file.preview);
      file.preview = 'preview removed';
    	formData.append('audioFiles', file);
    })

    // Dispatch POST action:
    this.props.uploadTracks(formData);
  }

	render() {
    const { library } = this.props;

		return (
      <div>
      <ErrorMessageContainer />
      {
        library.loading ?
          <Loader />
          :
    			<Uploader 
            handleUploadTracks={this.handleUploadTracks.bind(this)}
            handleOnDrop={this.handleOnDrop.bind(this)} 
            handleRemoveTrack={this.handleRemoveTrack.bind(this)}
            cleaeDroppedFiles={this.cleaeDroppedFiles.bind(this)}
            droppedFiles={this.state.droppedFiles}
          />
      }
      </div>
		);
	}
}

const mapStateToProps = state => {
	return {
		library: state.library,
	}
}

export default connect(mapStateToProps, actions)(UploaderContainer);
