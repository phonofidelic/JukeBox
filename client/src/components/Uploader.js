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
	
	renderDropzoneInput(field) {
    const files = field.input.value;
    const styles = {
    	root: {
    		background: 'green',
    	}
    }

    return (
      <div>
        <Dropzone
          name={field.name}
          onDrop={(filesToUpload, e) => field.input.onChange(filesToUpload)}
        >
          {
            field.meta.touched && 
            field.meta.error &&
            <span className="error">{field.meta.error}</span>
          }
          {
            files && Array.isArray(files) &&
            <ul>
              { files.map((file, i) => <li key={i}>{file.name}</li>) }
            </ul>
          }
        </Dropzone>
      </div>
    );
  }

  uploadTracksAndReset(files) {
  	console.log('uploadTracksAndReset, files:', files)
  	const { handleUploadTracks, reset } = this.props;
  	handleUploadTracks(files);
  	reset();
  }

	render() {
		const { 
			trackName, 
			handleUploadTracks,
			handleSubmit,
			reset
		} = this.props;

		const styles = {
			root: {
				margin: '20px',
				// visibility: 'hidden',
			}
		}
		return (
			<form onSubmit={handleSubmit(this.uploadTracksAndReset.bind(this))} style={styles.root}>

					<div>
            <label htmlFor={FILE_FIELD_NAME}>
	            <Field 
	            	name={FILE_FIELD_NAME} 
	            	component={props => <UploaderFullscreen reset={reset} {...props} />} 
	            />
            </label>
          </div>

          {/*<div>
            <button type="submit">Submit</button>
            <button onClick={() => reset()}>Clear Values</button>
          </div>*/}
			</form>
		);
	}
}

export default form(Uploader);
