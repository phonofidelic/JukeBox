import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { 
	Pause, 
	PlayArrow, 
	SkipPrevious, 
	SkipNext,
	MoreVert,
	MoreHoriz
} from 'material-ui-icons';

class PlayerControls extends Component {
	render() {
		const {
			player,
			handleStopTrack,
			handlePlayTrack,
			handlePauseTrack,
			handlePlayNext,
			handlePlayPrev,
			handleToggleQueue
		} = this.props;

		// TODO: Move PLayerControls to own component,
		//			 Add touch event listeners/handling on componentDidMount,
		//			 remove them on componentWillUnmount
		return (
			<Grid item xs={12} className="PlayerControls" onTouchStart={(e) => console.log('[LOG] onTouchStart', e) }>
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
}

export default PlayerControls;
