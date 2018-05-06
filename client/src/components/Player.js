import React, { Component } from 'react';
import PlayerControls from './PlayerControls';
import QueueList from './QueueList';
import Grid from 'material-ui/Grid';
import Collapse from 'material-ui/transitions/Collapse';
import {Howl, Howler} from 'howler';
import PlayerProgress from './PlayerProgress';

export class Player extends Component {
	render() {
		const { 
			player, 
			time,
			handleStopTrack,
			handlePlayTrack,
			handlePauseTrack,
			handlePlayNext,
			handlePlayPrev,
			handleToggleQueue,
			handlePlayFromQueue,
		} = this.props;

		const styles = {
			root: {
			  position: 'fixed',
			  bottom: '56px', // Makes room for bottom Nav componenet
			  width: '100%',
			  boxShadow: '0px -1px 20px 1px #ccc',
			  background: '#fff',
			  padding: '0'
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
				{	player.queue.length > 0 &&
					<div>
						<div>
							<PlayerProgress player={player} />
						</div>
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
				}
			</div>
		);
	}
}

export default Player;
