import React, { Component } from 'react';
import QueueList from './QueueList';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import { 
	Pause, 
	PlayArrow, 
	Stop, 
	SkipPrevious, 
	SkipNext,
	MoreVert,
	MoreHoriz
} from 'material-ui-icons';

export class Player extends Component {
	renderControlls() {
		const {
			player,
			handleStopTrack,
			handlePlayTrack,
			handlePauseTrack,
			handlePlayNext,
			handlePlayPrev,
			handleToggleQueue
		} = this.props;

		return (
			<Grid item xs={12}>
						<IconButton disabled={player.queue.length < 1} onClick={ handlePlayPrev }>
							<SkipPrevious />
						</IconButton>
						{
							!player.playing ? 
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
							disabled={player.queue.length <= 1 && player.queuIndex !== player.queue.length-1} 
							onClick={ handlePlayNext }>
							<SkipNext />
						</IconButton>
						
						<IconButton onClick={ handleToggleQueue }>
							{ player.showQueue ? <MoreVert /> : <MoreHoriz /> }
						</IconButton>
			</Grid>
		);
	}

	render() {
		const { player, trackList } = this.props;

		return (
			<div className="Player">
				{	player.queue.length > 0 &&
					<div>
					<Grid container>
						{ this.renderControlls() }
					</Grid>
					<Collapse direction="up" in={player.showQueue} collapsedHeight="0px">
						<QueueList queue={player.queue} currentTrack={player.currentTrack} />
					</Collapse>
					</div>
				}
			</div>
		);
	}
}

export default Player;
