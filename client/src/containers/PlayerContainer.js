import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/player.actions';
import { getSelectedTrack } from '../selectors';
import Player from '../components/Player';

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

class PlayerContainer extends Component {
	handlePlayTrack() {
		const { player } = this.props;
		this.props.playTrack(player.currentTrack);
	}

	handlePauseTrack() {
		const { player } = this.props;
		this.props.pauseTrack(player.currentTrack);
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

	handleSeek(pos, currentTrack) {
		this.props.seekInTrack(pos, currentTrack)
	}

	render() {
		const { trackList, player, selectedTrack, queueIndex } = this.props;
		return (
			<Player 
				player={ player }
				selectedTrack={ selectedTrack }
				handlePlayTrack={ this.handlePlayTrack.bind(this) }
				handlePauseTrack={ this.handlePauseTrack.bind(this) }
				handleStopTrack={ this.handleStopTrack.bind(this) }
				handlePlayNext={ this.handlePlayNext.bind(this) }
				handlePlayPrev={ this.handlePlayPrev.bind(this) }
				handleToggleQueue={ this.handleToggleQueue.bind(this) }
				handlePlayFromQueue={ this.handlePlayFromQueue.bind(this) }
				handleSeek={ this.handleSeek.bind(this) }
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		player: state.player_reducer,
		selectedTrack: getSelectedTrack(state),
	}
};

export default connect(mapStateToProps, actions)(PlayerContainer);