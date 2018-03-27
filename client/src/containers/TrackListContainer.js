import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trackListActions, playerActions } from '../actions';
import TrackList from '../components/TrackList';

const actions = { ...trackListActions, ...playerActions };

class TrackListContainer extends Component {
	constructor(props) {
		super(props);
		this.props.getTracks();
	}

	handleSelectTrack(track) {
		this.props.selectTrack(track);
	}

	handleStartNewQueue(track, currentTrack) {
		this.props.startNewQueue(track, currentTrack);
	}

	handleAddToQueue(track) {
		this.props.addToQueue(track);
	}

	render() {
		// const { tracks, error, selectedTrack } = this.props.trackList;
		console.log(this.props)
		const { trackList, player } = this.props;
		return(
			<TrackList 
				tracks={trackList.tracks}
				selectedTrack={trackList.selectedTrack}
				playing={ player.playing }
				currentTrack={player.howl}
				handleSelectTrack={ this.handleSelectTrack.bind(this) }
				handleStartNewQueue={ this.handleStartNewQueue.bind(this) }
				handleAddToQueue={ this.handleAddToQueue.bind(this) }
			/> 
		)
	}
}

const mapStateToProps = state => {
	return {
		trackList: state.trackList,
		player: state.player
	}
}

export default connect(mapStateToProps, actions)(TrackListContainer);