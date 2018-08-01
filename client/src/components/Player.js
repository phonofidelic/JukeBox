import React, { Component } from 'react';
import {Howl, Howler} from 'howler';
import PlayerProgress from './PlayerProgress';
import PlayerControls from './PlayerControls';
import QueueList from './QueueList';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import { withTheme } from '@material-ui/core/styles';

export class Player extends Component {
	render() {
		const { 
			player, 
			time,
			userAgentIsMobile,
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
			  bottom: userAgentIsMobile ? theme.dimensions.nav.navHeight : 0, // Makes room for bottom Nav componenet
			  width: '100%',
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
				<Collapse direction="up" in={player.showQueue} collapsedHeight="0px">
					<QueueList 
						queue={player.queue} 
						queueIndex={player.queueIndex}
						currentTrack={player.currentTrack} 
						handleStopTrack={handleStopTrack}
						handlePlayTrack={handlePlayTrack}
						handlePlayFromQueue={handlePlayFromQueue}
					/>
				</Collapse>
			</div>
		);
	}
}

export default withTheme()(Player);
