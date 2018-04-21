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

	handlePlayFromQueue(queue, prevQueueIndex, queueIndex, track) {
		this.props.playFromQueue(queue, prevQueueIndex, queueIndex, track);
	}

	render() {
		const { trackList, player, selectedTrack, queueIndex } = this.props;
		return (
			<Player 
				player={ player }
				handlePlayTrack={ this.handlePlayTrack.bind(this) }
				handlePauseTrack={ this.handlePauseTrack.bind(this) }
				handleStopTrack={ this.handleStopTrack.bind(this) }
				handlePlayNext={ this.handlePlayNext.bind(this) }
				handlePlayPrev={ this.handlePlayPrev.bind(this) }
				handleToggleQueue={ this.handleToggleQueue.bind(this) }
				handlePlayFromQueue={ this.handlePlayFromQueue.bind(this) }
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