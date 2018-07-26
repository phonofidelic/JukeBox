import React, { Component } from 'react';
import { connect } from 'react-redux';
import { libraryActions, playerActions } from '../actions';
import LibraryMobile from '../components/LibraryMobile';
import LibraryDesktop from '../components/LibraryDesktop';

const actions = { ...libraryActions, ...playerActions };

export class TrackListContainer extends Component {
	constructor(props) {
		super(props);
    this.props.loadLibrary();
    this.state = {
      order: 'desc',
      orderBy: 'title',
      page: 0,
      rowsPerPage: 5,
      anchorEl: null,
      alertOpen: false,
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

  handleSelectTrack(track) {
    this.props.selectTrack(track);
  }

  handleOptionsClick(e) {
    e.preventDefault();
    console.log('# options click #\n', e.currentTarget)
    this.setState({ ...this.state, anchorEl: e.currentTarget });
  }

  handleOptionsClose(e) {
    this.setState({ ...this.state, anchorEl: null });
  }

  handleMenuOptionClickEdit() {
    this.props.handleToggleEditMode();
  }

  handleMenuOptionClickDelete() {
    this.setState({ ...this.state, anchorEl: null });
    this.props.handleDeleteTrack(this.props.track);
  }

  handleCloseDetailView() {
    this.props.closeDetailView();
  }

	componentDidCatch(error, info) {
    console.log('componentDidCatch, error', error)
  }

	render() {
		const { library } = this.props;
    const { 
      order, 
      orderBy, 
      anchorEl 
    } = this.state;

    const userAgentIsMobile = navigator.userAgent.indexOf('Mobile') > 0;

    // console.log('userAgentIsMobile:', userAgentIsMobile)

		return userAgentIsMobile ?
			<LibraryMobile 
        library={library} 
        handleUploadTracks={this.handleUploadTracks.bind(this)} 
        handleOrderBy={this.handleOrderBy.bind(this)}
        handleCloseDetailView={this.handleCloseDetailView.bind(this)}
      /> 
		:
      <LibraryDesktop 
        library={library} 
        order={order}
        orderBy={orderBy}
        anchorEl={anchorEl}
        handleRequestSort={this.handleRequestSort.bind(this)}
        handleSelectTrack={this.handleSelectTrack.bind(this)}
        handleOptionsClick={this.handleOptionsClick.bind(this)}
        handleOptionsClose={this.handleOptionsClose.bind(this)}
        handleMenuOptionClickEdit={this.handleMenuOptionClickEdit.bind(this)}
        handleMenuOptionClickDelete={this.handleMenuOptionClickDelete.bind(this)}
        handleCloseDetailView={this.handleCloseDetailView.bind(this)}
      />
	}
}

const mapStateToProps = state => {
	return {
		library: state.library,
	}
}

export default connect(mapStateToProps, actions)(TrackListContainer);
