import React, { Component } from 'react';
import styled from 'styled-components';

import { 
	ThemeContext, 
	getSecondaryBackgroundColor,
} from '../../contexts/theme.context';

import CurrentTrack from './CurrentTrack';
import PlayerControls from './PlayerControls';

const Container = styled.div`
	background-color: ${getSecondaryBackgroundColor};
	display: flex;
	width: 100%;
`

class PlayerBar extends Component {
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
			</Container>
		);
	}
}

export default PlayerBar;
