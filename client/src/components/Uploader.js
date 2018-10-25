import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Upload from 'material-ui-upload/Upload';
import Dropzone from 'react-dropzone';
import Button from '@material-ui/core/Button';
import UploaderFullscreen from './UploaderFullscreen';

const FILE_FIELD_NAME = 'audioFiles';

// Register uploader form
const form = reduxForm({
	form: 'uploaderForm'
})

export class Uploader extends Component {
  uploadTracksAndReset(files) {
  	console.log('uploadTracksAndReset, files:', files)
  	const { handleUploadTracks, reset } = this.props;
  	handleUploadTracks(files);
  	this.handleReset();
  }

  handleReset() {
  	const { reset, cleaeDroppedFiles } = this.props;
  	reset();
  	cleaeDroppedFiles();
  }

	render() {
		const { 
			trackName, 
			droppedFiles,
      allDiscogsImport,
			handleOnDrop,
			handleRemoveTrack,
			handleUploadTracks,
			handleSubmit,
      handleSelectDiscogsImport,
      handleSelectAllDiscogsImport,
			reset
		} = this.props;

		const styles = {
			root: {
				margin: '20px',
			}
		}

		return (
			<form
        style={styles.root} 
        encType="multipart/form-data"
        onSubmit={handleSubmit(this.uploadTracksAndReset.bind(this))} 
      >
				<div>
          <label htmlFor={FILE_FIELD_NAME}>
            <Field 
            	name={FILE_FIELD_NAME}
            	handleOnDrop={handleOnDrop}
            	droppedFiles={droppedFiles}
              allDiscogsImport={allDiscogsImport}
            	reset={reset}
            	handleRemoveTrack={handleRemoveTrack}
              handleSelectDiscogsImport={handleSelectDiscogsImport}
              handleSelectAllDiscogsImport={handleSelectAllDiscogsImport}
            	handleReset={this.handleReset.bind(this)}
            	component={ (props) => <UploaderFullscreen {...props} /> } 
            />
          </label>
        </div>
			</form>
		);
	}
}

export default form(Uploader);
