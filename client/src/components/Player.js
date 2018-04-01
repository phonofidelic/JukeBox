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

		const styles = {
			root: {
			  position: 'fixed',
			  bottom: '0px',
			  width: '100%',
			  boxShadow: '0px -1px 20px 1px #ccc',
			  background: '#fff',
			  padding: '0'
			}
		};
		
		return (
			<div style={styles.root}>
				{	player.queue.length > 0 &&
					<div>
					<Grid container>
						<Grid item xs={12}>
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
