import React, { Component } from 'react';
import { connect } from 'react-redux';
import { libraryActions, playerActions } from '../actions';
import { getSelectedTrack } from '../selectors';
import LibraryRow from '../components/LibraryRow';
import { TableRow } from '@material-ui/core';

const actions = { ...libraryActions, ...playerActions };

class LibraryRowContainer extends Component {
	handleSelectTrack(track) {
		this.props.selectTrack(track);
	}

	handleStartNewQueue(track, currentTrack) {
		this.props.sendToQueueAndPlay(track, currentTrack, true);
	}

	handleAddToQueue(track) {
		this.props.addToQueue(track);
	}

	handleEditTrackData(formData, trackData) {
		this.props.editTrack(formData, trackData);
	}

	handleDeleteTrack(trackData) {
		console.log('trackData', trackData)
		// TODO: dispatch custom confirm action connected to MUI Alert component
		const confirm = window.confirm(`Are you sure you want to delete "${trackData.title}"?`);
		if (confirm) {
			return this.props.deleteTrackConfirm(trackData);
		}
		return this.props.deleteTrackCancel();
	}

	handleOpenDetailView(data, type) {
    this.props.showDetailView(data, type);
  }

  handleCloseDetailView() {
    this.props.closeDetailView();
  }

	render() {
		const {
			track,
			player,
			selectedTrack,
			handleStartNewQueue,
			handleOpenDetailView,
			handleCloseDetailView,
		} = this.props;

		return (
			<LibraryRow
				track={track}
				player={player}
				selectedTrack={selectedTrack}
				handleSelectTrack={this.handleSelectTrack.bind(this)}
				handleStartNewQueue={this.handleStartNewQueue.bind(this)}
				handleAddToQueue={this.handleAddToQueue.bind(this)}
				handleEditTrackData={this.handleEditTrackData.bind(this)}
				handleDeleteTrack={this.handleDeleteTrack.bind(this)}
				handleOpenDetailView={this.handleOpenDetailView.bind(this)}
        handleCloseDetailView={this.handleCloseDetailView.bind(this)}
			>
			</LibraryRow>
		);
	}
}

const mapStateToProps = state => {
	return {
		// trackList: state.trackList,
		selectedTrack: getSelectedTrack(state),
		player: state.player
	}
}

export default connect(mapStateToProps, actions)(LibraryRowContainer);