import React, { Component } from 'react';
import { connect } from 'react-redux';
import { libraryActions, playerActions, messageActions } from '../actions';
import { getSelectedTrack } from '../selectors';
import TrackListItem from '../components/TrackListItem';

const actions = { ...libraryActions, ...playerActions, ...messageActions };

class TrackListItemContainer extends Component {
	handleSelectTrack(track) {
		console.log('handleSelectTrack, track:', track)
		this.props.selectTrack(track);
	}

	handleStartNewQueue(track, currentTrack) {
		this.props.sendToQueueAndPlay(track, currentTrack, true);
	}

	handleAddToQueue(track) {
		this.props.addToQueue(track);
	}

	handleEditTrackData(formData, track) {
		this.props.editTrack(formData, track);
	}

	handleDeleteTrack(track) {
		// TODO: dispatch custom confirm action connected to MUI Alert component
		const confirm = window.confirm(`Are you sure you want to delete "${track.title}"?`);
		if (confirm) {
			return this.props.deleteTrackConfirm(track);
		}
		return this.props.deleteTrackCancel();
	}

	handleOpenDetailView(data, type) {
    this.props.showDetailView(data, type);
  }

	render() {
		const { selectedTrack, player, track } = this.props;
		// console.log('timeElapsed from TrackListItemContainer:', this.state.timeElapsed)
		return (
			<TrackListItem 
				track={track}
				player={player}
				selectedTrack={selectedTrack}
				handleSelectTrack={this.handleSelectTrack.bind(this)}
				handleStartNewQueue={this.handleStartNewQueue.bind(this)}
				handleAddToQueue={this.handleAddToQueue.bind(this)}
				handleEditTrackData={this.handleEditTrackData.bind(this)}
				handleDeleteTrack={this.handleDeleteTrack.bind(this)}
				handleOpenDetailView={this.handleOpenDetailView.bind(this)}
			/>
		)
	}
}

const mapStateToProps = state => {
	return {
		// trackList: state.trackList,
		selectedTrack: getSelectedTrack(state),
		player: state.player
	}
}

export default connect(mapStateToProps, actions)(TrackListItemContainer);
