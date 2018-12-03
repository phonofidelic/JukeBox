import React, { Component } from 'react';
import styles from './Player.styles';
import PropTypes from 'prop-types';
// import {Howl, Howler} from 'howler';
import PlayerProgress from './PlayerProgress';
import PlayerControls from './PlayerControls';
import QueueList from './QueueList';
import Grid from '@material-ui/core/Grid';
// import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';

export class Player extends Component {
	render() {
		const { 
			player, 
			// userAgentIsMobile,
			handleStopTrack,
			handlePlayTrack,
			handlePauseTrack,
			handlePlayNext,
			handlePlayPrev,
			handleToggleQueue,
			handlePlayFromQueue,
			handleSeek,
			classes,
		} = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<QueueList 
						queue={player.queue}
						queueIndex={player.queueIndex}
						currentTrack={player.currentTrack} 
						handleStopTrack={handleStopTrack}
						handlePlayTrack={handlePlayTrack}
						handlePlayFromQueue={handlePlayFromQueue}
						showQueue={player.showQueue}
					/>
					<PlayerProgress 
						player={player}
						handleSeek={handleSeek}
					 />
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
					
				</div>
			</div>
		);
	}
}

Player.propTypes = {
	player: PropTypes.object.isRequired,
	userAgentIsMobile: PropTypes.bool.isRequired,
	handlePlayTrack: PropTypes.func.isRequired,
	handlePauseTrack: PropTypes.func.isRequired,
	handleStopTrack: PropTypes.func.isRequired,
	handlePlayNext: PropTypes.func.isRequired,
	handlePlayPrev: PropTypes.func.isRequired,
	handleToggleQueue: PropTypes.func.isRequired,
	handlePlayFromQueue: PropTypes.func.isRequired,
	handleSeek: PropTypes.func.isRequired,
}

export default withStyles(styles)(Player);
