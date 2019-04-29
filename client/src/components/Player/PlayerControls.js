import React, { Component } from 'react';
import styled from 'styled-components';

import { ThemeContext, getPlayerHeight } from '../../contexts/theme.context';

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

const Container = styled.div`
	display: flex;
	width: 100%;
`

const CurrentTrackContainer = styled.div`
	display: flex;
	height: ${getPlayerHeight}
`

const ControlsContainer = styled.div`
	display: flex;
	height: ${getPlayerHeight}px;
	justify-content: center;
	width: 100%;

	// & > button {
	// 	flex: auto;
	// }
`

const ToggleButtonContainer = styled.div`
	// display: flex;
`

const Control = styled.div`
	flex: auto;
	max-width: 80px;
`

const CurrentTrackImage = styled.div`

`

const CurrentTrackInfo = styled.div`
	// flex: initial;
	width: 120px;
	padding-left: 8px;
`

class PlayerControls extends Component {
	static contextType = ThemeContext;

	render() {
		const {
			player,
			// handleStopTrack,
			userAgentIsMobile,
			handlePlayTrack,
			handlePauseTrack,
			handlePlayNext,
			handlePlayPrev,
			handleToggleQueue,
			classes,
		} = this.props;

		const theme = this.context;

		return (
			<Container>
				<CurrentTrackContainer 
					theme={theme}
					item xs={5} 
					className={classes.currentTrackContainer}
					style={{height: theme.dimensions.player.height}}
				>
					<CurrentTrackImage theme={theme}>
						<img 
							src={player.currentTrack.image.src} 
							alt="Album art" 
							width={theme.dimensions.player.height - theme.dimensions.playerProgress.height} 
							height={theme.dimensions.player.height - theme.dimensions.playerProgress.height} 
						/>
					</CurrentTrackImage>
					<CurrentTrackInfo theme={theme}>
						<Typography noWrap>{player.currentTrack.title}</Typography>
						<Typography noWrap variant="caption">{player.currentTrack.artist.name}</Typography>
					</CurrentTrackInfo>
				</CurrentTrackContainer>
				<ControlsContainer
					theme={theme} 
				>
					<Control>
						<IconButton disabled={player.queueIndex === 0} onClick={ handlePlayPrev }>
							<SkipPrevious />
						</IconButton>
					</Control>
					<Control>
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
					</Control>
					<Control>
						<IconButton 
							disabled={player.queueIndex+1 === player.queue.length} 
							onClick={ handlePlayNext }>
							<SkipNext />
						</IconButton>
					</Control>
					
				</ControlsContainer>
				{ !userAgentIsMobile &&
					<ToggleButtonContainer>
						<IconButton 
							onClick={ handleToggleQueue }
						>
							{ player.showQueue ? <ExpandMore /> : <ExpandLess /> }
						</IconButton>
					</ToggleButtonContainer>
				}
			</Container>
		);
	}
}

export default withStyles(styles)(PlayerControls);
