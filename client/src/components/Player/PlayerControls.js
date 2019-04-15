import React, { Component } from 'react';
import styles from './PlayerControls.styles';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import SkipNext from '@material-ui/icons/SkipNext';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import withStyles from '@material-ui/core/styles/withStyles';

import { THEME } from '../../config';

class PlayerControls extends Component {
	state = {
		touch: null
	}

	handleTouchStart(e) {
		console.log('touch-start', e.targetTouches);
		// Set new starting touch reference
		this.setState({touch: e.targetTouches[0].clientY})

		// Fix player position to touch Y position
	}

	handleTouchMove(e) {
		console.log('touch-move', e.targetTouches);

		// Update player position to touch Y position
	}

	handleTouchEnd(e) {
		const {player, handleToggleQueue} = this.props;
		console.log('touch-end', e.targetTouches);
		// if(e.targetTouches.length) console.log('touch-end, touch diff', touch - e.targetTouches[0].clientY);
		
		// If touch has lower clientY (higher screen pos) at end,
		// handle show queue
		// If touch has higher clientY (lower screen pos) at end,
		// handle hide queue
		if(e.targetTouches.length && this.state.touch - e.targetTouches[0].clientY > 0) {
			console.log('OPEN');
			// If queue is not already opoen, open it
			return !player.showQueue ? handleToggleQueue() : null;
		} else if(e.targetTouches.length && this.state.touch - e.targetTouches[0].clientY < 0){
			console.log('CLOSE');
			// If queue is not already closed, close it
			return player.showQueue ? handleToggleQueue() : null;
		}
	}

	handleTouchCancel(e) {
		console.log('touch-cancel', e.targetTouches);
	}

	render() {
		const {
			player,
			// handleStopTrack,
			handlePlayTrack,
			handlePauseTrack,
			handlePlayNext,
			handlePlayPrev,
			handleToggleQueue,
			classes,
		} = this.props;

		// const styles = {
		// 	togglePlayerButton: {
		// 		position: 'fixed', 
		// 		right: '0px', 
		// 		zIndex: '1001'
		// 	}
		// }

		return (
			<Grid 
				container 
				alignItems="center"
			>
				<Grid item xs={5} className={classes.currentTrackContainer}>
					<Grid container>
						<Grid item xs={5}>
							<img 
								src={player.currentTrack.image.src} 
								alt="Album art" 
								width={THEME.dimensions.player.height - THEME.dimensions.playerProgress.height} 
								height={THEME.dimensions.player.height - THEME.dimensions.playerProgress.height} 
							/>
						</Grid>
						<Grid item xs={7}>
							<Typography noWrap>{player.currentTrack.title}</Typography>
							<Typography noWrap variant="caption">{player.currentTrack.artist.name}</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={'auto'}>
					<IconButton disabled={player.queueIndex === 0} onClick={ handlePlayPrev }>
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
						disabled={player.queueIndex+1 === player.queue.length} 
						onClick={ handlePlayNext }>
						<SkipNext />
					</IconButton>
				</Grid>
				{/*<div style={styles.togglePlayerButton}>*/}
				<Grid item xs={'auto'} className={classes.toggleButtonContainer}>
					<IconButton 
						onClick={ handleToggleQueue }
						onTouchStart={this.handleTouchStart.bind(this)}
						onTouchMove={this.handleTouchMove.bind(this)}
						onTouchEnd={this.handleTouchEnd.bind(this)}
						onTouchCancel={this.handleTouchCancel.bind(this)} 
					>
						{ player.showQueue ? <ExpandMore /> : <ExpandLess /> }
					</IconButton>
				</Grid>
				{/*</div>*/}
			</Grid>
		);
	}
}

export default withStyles(styles)(PlayerControls);
