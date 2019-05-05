import React, { Component } from 'react';
import styled from 'styled-components';

import { 
	ThemeContext, 
	getSecondaryBackgroundColor,
} from '../../contexts/theme.context';

import CurrentTrack from './CurrentTrack';
import PlayerControls from './PlayerControls';

import IconButton from '@material-ui/core/IconButton';
import QueueMusic from '@material-ui/icons/QueueMusic';
import Album from '@material-ui/icons/Album';

const Container = styled.div`
	background-color: ${getSecondaryBackgroundColor};
	display: flex;
	width: 100%;
`

const ToggleQueueContainer = styled.div`
	color: rgba(0, 0, 0, 0.54);
	margin-top: 8px;
	margin-left: auto;
`

class PlayerBar extends Component {
	static contextType = ThemeContext;

	render() {
		const {
			player,
			playerIsOpen,
			showQueue,
			userAgentIsMobile,
			handlePlayTrack,
			handlePauseTrack,
			handlePlayNext,
			handlePlayPrev,
			handlePlayerToggle,
			handleQueueToggle,
		} = this.props;

		const theme = this.context;

		return (
			<Container theme={theme}>
				<CurrentTrack 
					player={player}
					playerIsOpen={playerIsOpen}
				/>
				{ !playerIsOpen &&
					<PlayerControls
						player={player}
						playerIsOpen={playerIsOpen}
						userAgentIsMobile={userAgentIsMobile}
						handlePlayTrack={handlePlayTrack}
						handlePauseTrack={handlePauseTrack}
						handlePlayNext={handlePlayNext}
						handlePlayPrev={handlePlayPrev}
						handlePlayerToggle={handlePlayerToggle}
					/>
				}
				{ playerIsOpen &&
					<ToggleQueueContainer>
						<IconButton onClick={() => handleQueueToggle()}>
							{	showQueue ? <Album /> : <QueueMusic /> }
						</IconButton>
					</ToggleQueueContainer>
				}
				
			</Container>
		);
	}
}

export default PlayerBar;
