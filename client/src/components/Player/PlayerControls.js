import React, { Component } from 'react';

import { ThemeContext } from '../../contexts/theme.context';

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

class PlayerControls extends Component {
	static contextType = ThemeContext;

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

		const theme = this.context;

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
								width={theme.dimensions.player.height - theme.dimensions.playerProgress.height} 
								height={theme.dimensions.player.height - theme.dimensions.playerProgress.height} 
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
