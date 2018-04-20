import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/player';
import { getSelectedTrack } from '../selectors';
import Player from '../components/Player';

class PlayerContainer extends Component {
	handlePlayTrack() {
		const { player } = this.props;
		this.props.playTrack(player.queue, player.queueIndex);
	}

	handlePauseTrack() {
		const { player } = this.props;
		console.log('handlePauseTrack, track:', player.howl)
		this.props.pauseTrack(player.queue, player.queueIndex);
	}

	handleStopTrack() {
		const { player } = this.props;
		this.props.stopTrack(player.queue, player.queueIndex);
	}

	handlePlayNext() {
		const { player } = this.props;
		this.props.playNext(player.queue, player.queueIndex);
	}

	handlePlayPrev() {
		const { player } = this.props;
		this.props.playPrev(player.queue, player.queueIndex);
	}

	handleToggleQueue() {
		this.props.toggleQueue();
	}

	render() {
		const { trackList, player, selectedTrack } = this.props;
		// console.log('PlayerContainer, playing:', playing)
		return (
			<Player 
				player={ player }
				handlePlayTrack={ this.handlePlayTrack.bind(this) }
				handlePauseTrack={ this.handlePauseTrack.bind(this) }
				handleStopTrack={ this.handleStopTrack.bind(this) }
				handlePlayNext={ this.handlePlayNext.bind(this) }
				handlePlayPrev={ this.handlePlayPrev.bind(this) }
				handleToggleQueue={ this.handleToggleQueue.bind(this) }
				selectedTrack={ selectedTrack }
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		player: state.player,
		selectedTrack: getSelectedTrack(state),
	}
};

export default connect(mapStateToProps, actions)(PlayerContainer);