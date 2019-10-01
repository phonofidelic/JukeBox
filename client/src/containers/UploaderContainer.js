import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/uploader.actions';
import Uploader from '../components/Uploader';
import Loader from '../components/Loader';
import ErrorMessageContainer from './ErrorMessageContainer';
import axios from 'axios';
import { URLS } from '../config';

const TRACKS_URL = URLS.TRACK_URL;

const DISCOGS_IMPORT_DEFAULT = true;

export class UploaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      droppedFiles: [],
      allDiscogsImport: DISCOGS_IMPORT_DEFAULT
    };
  }

  handleOnDrop(files) {
    files = files.map(file => {
      file.importDiscogsData = DISCOGS_IMPORT_DEFAULT;
      return file;
    });

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

  handleSelectAllDiscogsImport() {
    const updatedFileList = this.state.droppedFiles.map(file => {
      file.importDiscogsData = !this.state.allDiscogsImport;
      return file;
    });

    this.setState({
      droppedFiles: updatedFileList,
      allDiscogsImport: !this.state.allDiscogsImport
    });
  }

  handleSelectDiscogsImport(index) {
    const updatedFileList = this.state.droppedFiles.map((file, i) => {
      if (i === index) {
        file.importDiscogsData = !file.importDiscogsData;
        return file;
      }
      return file;
    });

    console.log('file', updatedFileList[index]);

    this.setState({
      droppedFiles: updatedFileList
    });
  }

  handleUploadTracks() {
    console.log('handleUploadTracks, droppedFiles:', this.state.droppedFiles);
    let formData = new FormData();

    if (!this.state.droppedFiles) return console.log('* no input data *');

    this.state.droppedFiles.forEach(async file => {
      // Remove preview for all files to prevent memory leaks:
      // https://github.com/react-dropzone/react-dropzone#word-of-caution-when-working-with-previews
      window.URL.revokeObjectURL(file.preview);
      file.preview = 'preview removed';

      // // Get s3 signed url
      // const uploadConfig = await axios.get(`${TRACKS_URL}/upload`);
      // file.url = uploadConfig.data.url;
      // await axios.put(uploadConfig.data.url, file, {
      //   headers: {
      //     'Content-Type': file.type
      //   }
      // });

      console.log('file:', file);
      formData.append('audioFiles', file);
      // formData.append(file.name, JSON.stringify({discogsImport: file.importDiscogsData}));
      formData.append(file.name, file.importDiscogsData);
    });

    // Dispatch POST action:
    this.props.uploadTracks(formData);
  }

  render() {
    const { library } = this.props;

    return (
      <div>
        <ErrorMessageContainer />
        {library.loading ? (
          <Loader />
        ) : (
          <Uploader
            allDiscogsImport={this.state.allDiscogsImport}
            droppedFiles={this.state.droppedFiles}
            handleUploadTracks={this.handleUploadTracks.bind(this)}
            handleOnDrop={this.handleOnDrop.bind(this)}
            handleRemoveTrack={this.handleRemoveTrack.bind(this)}
            cleaeDroppedFiles={this.cleaeDroppedFiles.bind(this)}
            handleSelectDiscogsImport={this.handleSelectDiscogsImport.bind(
              this
            )}
            handleSelectAllDiscogsImport={this.handleSelectAllDiscogsImport.bind(
              this
            )}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    library: state.library
  };
};

export default connect(
  mapStateToProps,
  actions
)(UploaderContainer);
