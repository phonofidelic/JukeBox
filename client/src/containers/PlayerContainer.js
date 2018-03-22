import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/player';
import Player from '../components/Player';

class PlayerContainer extends Component {
	handlePlayTrack() {
		this.props.playTrack();
	}

	handlePauseTrack() {
		this.props.pauseTrack();
	}

	handleStopTrack() {
		this.props.stopTrack();
	}

	render() {
		const { trackList, player } = this.props;
		// console.log('PlayerContainer, playing:', playing)
		return (
			<Player 
				que={ player.que } 
				playing={ player.playing }
				handlePlayTrack={ this.handlePlayTrack.bind(this) }
				handlePauseTrack={ this.handlePauseTrack.bind(this) }
				handleStopTrack={ this.handleStopTrack.bind(this) }
				tracks={ trackList.tracks }
				selectedTrack={ trackList.selectedTrack }
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		player: state.player,
		trackList: state.trackList
	}
};

export default connect(mapStateToProps, actions)(PlayerContainer);