import React, { Component } from 'react';

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
				<button disabled={queue.length <= 1 & queuIndex !== queue.length+1} onClick={ handlePlayNext }>>|</button>
			</div>
		);
	}

	renderQueue() {
		const { queue, queuIndex } = this.props;
		return (
			<ul>
				{ queue.map((track, i) => (
					<li key={i}>{track.name}{i === queuIndex ? <span>*</span> : null}</li>
				)) }
			</ul>
		);
	}

	render() {
		const { queue } = this.props;
		return (
			<div>
				{queue.length > 0 && (
					<div>
						Player
						{this.renderControlls()}
						{this.renderQueue()}
					</div>
				)}
			</div>
		);
	}
}

export default Player;