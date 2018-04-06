import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trackListActions, playerActions } from '../actions';
import TrackListItem from '../components/TrackListItem';

const actions = { ...trackListActions, ...playerActions };

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
		this.props.deleteTrackConfirm(trackData);
	}

	render() {
		const { trackList, player, track } = this.props;
		return (
			<TrackListItem 
				track={track}
				player={player}
				selectedTrack={trackList.selectedTrack}
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
		trackList: state.trackList,
		player: state.player
	}
}

export default connect(mapStateToProps, actions)(TrackListItemContainer);