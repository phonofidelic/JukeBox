import React, { Component } from 'react';
import QueueList from './QueueList';

export class Player extends Component {
	renderControlls() {
		const {
			queue,
			playing, 
			queuIndex,
			handleStopTrack,
			handlePlayTrack,
			handlePauseTrack,
			handlePlayNext,
			handlePlayPrev
		} = this.props;

		return (
			<div>
				<button disabled={queue.length < 1} onClick={ handlePlayPrev }>{'|<'}</button>
				{!playing ? <button onClick={ handlePlayTrack }>play</button> : <button onClick={ handlePauseTrack }>pause</button>}
				<button onClick={ handleStopTrack }>stop</button>
				<button disabled={queue.length <= 1 && queuIndex !== queue.length-1} onClick={ handlePlayNext }>>|</button>
			</div>
		);
	}

	render() {
		const { queue, queueIndex, currentTrack } = this.props;

		return (
			<div className="Player">
				{queue.length > 0 && (
					<div>
						{ this.renderControlls() }
						<QueueList 
							queue={queue}
							currentTrack={currentTrack}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default Player;