import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trackListActions, playerActions } from '../actions';
import Library from '../components/Library';
import LibraryDesktop from '../components/LibraryDesktop';

const actions = { ...trackListActions, ...playerActions };

export class TrackListContainer extends Component {
	constructor(props) {
		super(props);
		this.props.getTracks();
    this.props.loadLibrary();
    this.state = {
      order: 'asc',
      orderBy: 'title',
      page: 0,
      rowsPerPage: 5,
    }
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

  // https://github.com/mui-org/material-ui/blob/66e42d782e846367d832b97a80583448cb58b721/docs/src/pages/demos/tables/EnhancedTable.js#L212
  handleRequestSort(e, columnId) {
    const orderBy = columnId;
    let order = 'desc';

    if (this.state.orderBy === columnId && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  }

	componentDidCatch(error, info) {
    console.log('componentDidCatch, error', error)
  }

	render() {
		const { library } = this.props;
    const { order, orderBy } = this.state;
    const userAgentIsMobile = navigator.userAgent.indexOf('Mobile') > 0;
    console.log('userAgentIsMobile:', userAgentIsMobile)

		return userAgentIsMobile ?
			<Library 
        library={library} 
        handleUploadTracks={this.handleUploadTracks.bind(this)} 
        handleOrderBy={this.handleOrderBy.bind(this)}
      /> 
		:
      <LibraryDesktop 
        library={library} 
        order={order}
        orderBy={orderBy}
        handleRequestSort={this.handleRequestSort.bind(this)}
      />
	}
}

const mapStateToProps = state => {
	return {
		library: state.library,
	}
}

export default connect(mapStateToProps, actions)(TrackListContainer);
