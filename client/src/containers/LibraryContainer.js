import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  libraryActions, 
  playerActions, 
  authActions 
} from '../actions';
import LibraryMobile from '../components/LibraryMobile';
import LibraryDesktop from '../components/LibraryDesktop';
import DetailCard from '../components/DetailCard';
import Loader from '../components/Loader';
import ErrorMessageContainer from './ErrorMessageContainer';

const actions = { 
  ...libraryActions, 
  ...playerActions, 
  ...authActions 
};

export class LibraryContainer extends Component {
	constructor(props) {
		super(props);
    this.props.checkUserAgent();
    this.props.loadLibrary();
    this.state = {
      order: 'desc',
      orderBy: 'title',
      page: 0,  // TODO
      rowsPerPage: 5, // TODO
      anchorEl: null,
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

  handleOrderBy(fieldName, order) {
    if (!order) order = 'desc';
    this.props.orderTracksByFieldValue(fieldName, order);
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

  handleCloseError() {
    this.props.dismissLibraryError();
  }

	componentDidCatch(error, info) {
    console.log('componentDidCatch, error', error)
  }

	render() {
		const { 
      library, 
      userAgentIsMobile,
      queueIsOpen,
    } = this.props;

    const {
      order, 
      orderBy, 
      anchorEl,
    } = this.state;

		return (
      <div>
        <ErrorMessageContainer />
        <DetailCard 
          detailViewData={library.detailViewData}
          handleCloseDetailView={this.handleCloseDetailView.bind(this)}
        /> 
        { library.loading && <Loader /> }
        { 
          userAgentIsMobile ?
    			<LibraryMobile 
            library={library} 
            order={order}
            orderBy={orderBy}
            queueIsOpen={queueIsOpen}
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
            userAgentIsMobile={userAgentIsMobile}
            handleRequestSort={this.handleRequestSort.bind(this)}
            handleSelectTrack={this.handleSelectTrack.bind(this)}
            handleOptionsClick={this.handleOptionsClick.bind(this)}
            handleOptionsClose={this.handleOptionsClose.bind(this)}
            handleMenuOptionClickEdit={this.handleMenuOptionClickEdit.bind(this)}
            handleMenuOptionClickDelete={this.handleMenuOptionClickDelete.bind(this)}
            handleCloseDetailView={this.handleCloseDetailView.bind(this)}
          />
        }
      </div>
    );
	}
}

const mapStateToProps = state => {
	return {
		library: state.library,
    userAgentIsMobile: state.auth.userAgentIsMobile,
    queueIsOpen: state.player.showQueue,
	}
}

export default connect(mapStateToProps, actions)(LibraryContainer);
