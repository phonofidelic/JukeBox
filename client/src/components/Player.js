import React, { Component } from 'react';
import QueueList from './QueueList';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { 
	Pause, 
	PlayArrow, 
	Stop, 
	SkipPrevious, 
	SkipNext,
	MoreVert
} from 'material-ui-icons';

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
			<Grid item xs={12}>
						<IconButton disabled={queue.length < 1} onClick={ handlePlayPrev }>
							<SkipPrevious />
						</IconButton>
						{
							!playing ? 
							<IconButton onClick={ handlePlayTrack }>
								<PlayArrow />
							</IconButton>
							: 
							<IconButton onClick={ handlePauseTrack }>
								<Pause />
							</IconButton>
						}
						{/*<IconButton onClick={ handleStopTrack }>
													<Stop />
												</IconButton>*/}
						<IconButton 
							disabled={queue.length <= 1 && queuIndex !== queue.length-1} 
							onClick={ handlePlayNext }>
							<SkipNext />
						</IconButton>
						<IconButton>
							<MoreVert />
						</IconButton>
			</Grid>
		);
	}

	render() {
		const { queue, currentTrack } = this.props;

		return (
			<div className="Player">
				{queue.length > 0 && (
					<div>
						<Grid container>
							{ this.renderControlls() }
						</Grid>
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