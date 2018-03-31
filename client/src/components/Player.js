import React, { Component } from 'react';
import QueueList from './QueueList';
import Button from 'material-ui/Button';

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
				<Button disabled={queue.length < 1} onClick={ handlePlayPrev }>{'|<'}</Button>
				{!playing ? <Button onClick={ handlePlayTrack }>play</Button> : <Button onClick={ handlePauseTrack }>pause</Button>}
				<Button onClick={ handleStopTrack }>stop</Button>
				<Button disabled={queue.length <= 1 && queuIndex !== queue.length-1} onClick={ handlePlayNext }>>|</Button>
			</div>
		);
	}

	render() {
		const { queue, currentTrack } = this.props;

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