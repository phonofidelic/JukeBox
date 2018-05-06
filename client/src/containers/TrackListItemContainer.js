import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trackListActions, playerActions, messageActions } from '../actions';
import { getSelectedTrack } from '../selectors';
import TrackListItem from '../components/TrackListItem';

const actions = { ...trackListActions, ...playerActions, ...messageActions };

class TrackListItemContainer extends Component {
	handleSelectTrack(track) {
		this.props.selectTrack(track);
	}

	handleStartNewQueue(track, currentTrack) {
		this.props.startNewQueue(track, currentTrack);
	}

	handleAddToQueue(track) {
		this.props.addToQueue(track);
	}

	handlePostTrackData(formData, trackData) {
		this.props.postTrackData(formData, trackData);
	}

	handleDeleteTrack(trackData) {
		// TODO: dispatch custom confirm action connected to MUI Alert component
		const confirm = window.confirm('Are you sure you want to delete this track?')
		if (confirm) {
			return this.props.deleteTrackConfirm(trackData)
		}
		return this.props.deleteTrackCancel();
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
				handlePostTrackData={this.handlePostTrackData.bind(this)}
				handleDeleteTrack={this.handleDeleteTrack.bind(this)}
			/>
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

export default connect(mapStateToProps, actions)(TrackListItemContainer);
