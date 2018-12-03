import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import {Howl, Howler} from 'howler';
import PlayerProgress from './PlayerProgress';
import PlayerControls from './PlayerControls';
import QueueList from './QueueList';
import Grid from '@material-ui/core/Grid';
// import Collapse from '@material-ui/core/Collapse';
import { withTheme } from '@material-ui/core/styles';

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
			theme,
		} = this.props;

		const styles = {
			root: {
			  position: 'fixed',
			  bottom: 0,
			  width: '100%',
			  // maxWidth: 500,
			  boxShadow: '0px -1px 20px 1px #ccc',
			  backgroundColor: theme.palette.secondary.light,
			  borderBottom: `solid 1px ${theme.palette.primary.main}`,
			  padding: '0',
			  zIndex: 2,
			}
		};
		
		// [CONTRACT]
		// If player.queue has tracks: 
		// * render controls and queue list.
		// * pass player action handlers to PLayerControls component.
		// * render QueueList with queue and currentTrack props inside MUI Collapse component.
		// Otherwise: Player component is an empty div.
		return (
			<div style={styles.root}>
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

export default withTheme()(Player);
