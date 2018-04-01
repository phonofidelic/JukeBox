import React, { Component } from 'react';
import PlayerControls from './PlayerControls';
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
	render() {
		const { 
			player, 
			trackList,
			handleStopTrack,
			handlePlayTrack,
			handlePauseTrack,
			handlePlayNext,
			handlePlayPrev,
			handleToggleQueue
		} = this.props;

		return (
			<div className="Player">
				{	player.queue.length > 0 &&
					<div>
					<Grid container>
						<PlayerControls 
							player={player}
							handleStopTrack={handleStopTrack}
							handlePlayTrack={handlePlayTrack}
							handlePauseTrack={handlePauseTrack}
							handlePlayNext={handlePlayNext}
							handlePlayPrev={handlePlayPrev}
							handleToggleQueue={handleToggleQueue}
						/>
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
