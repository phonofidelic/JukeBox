import React, { Component } from 'react';
import styled from 'styled-components';
import { 
	ThemeContext,
	getPlayerHeight
} from '../../contexts/theme.context';

import IconButton from '@material-ui/core/IconButton';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import SkipNext from '@material-ui/icons/SkipNext';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

const Container = styled.div`
	display: flex;
	height: ${getPlayerHeight}px;
	justify-content: center;
	width: 100%;

	// & > button {
	// 	flex: auto;
	// }
`

const Control = styled.div`
	flex: auto;
	max-width: 80px;
`

const ToggleButtonContainer = styled.div`
	// display: flex;
`


class PlayerControls extends Component {
	static contextType = ThemeContext;

	render() {
		const {
			player,
			playerIsOpen,
			userAgentIsMobile,
			handlePlayTrack,
			handlePauseTrack,
			handlePlayNext,
			handlePlayPrev,
			handlePlayerToggle,
		} = this.props;

		const theme = this.context;

		return (
			<Container
				theme={theme} 
			>
				<Control style={{marginLeft: !userAgentIsMobile ? 'auto' : 0}}>
					<IconButton 
						disabled={player.queueIndex === 0} 
						onClick={ handlePlayPrev }
					>
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
				{ !userAgentIsMobile &&
					<Control style={{marginLeft: 'auto'}}>
						<ToggleButtonContainer>
							<IconButton 
								onClick={ handlePlayerToggle }
							>
								{ playerIsOpen ? <ExpandMore /> : <ExpandLess /> }
							</IconButton>
						</ToggleButtonContainer>
					</Control>
				}
			</Container>
		);
	}
}

export default PlayerControls;
