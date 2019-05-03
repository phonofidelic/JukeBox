import React, { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext, getPlayerHeight } from '../../contexts/theme.context';

import Typography from '@material-ui/core/Typography';

const CurrentTrackContainer = styled.div`
	display: flex;
	text-align: left;
	height: ${getPlayerHeight}
`
const CurrentTrackImage = styled.div`

`

const CurrentTrackInfo = styled.div`
	width: ${props => props.playerIsOpen? '100%' : '120px'};
	padding: 8px;
`

const CurrentTrack = props => {
	const {
		player,
		playerIsOpen,
	} = props;

	const theme = useContext(ThemeContext);

	return (
		<CurrentTrackContainer 
			theme={theme}
			style={{height: theme.dimensions.player.height}}
		>
			<CurrentTrackImage theme={theme}>
				<img 
					src={player.currentTrack.image.src} 
					alt="Album art" 
					width={theme.dimensions.player.height} 
					height={theme.dimensions.player.height} 
				/>
			</CurrentTrackImage>
			<CurrentTrackInfo 
				theme={theme}
				playerIsOpen={playerIsOpen}
			>
				<Typography noWrap>{player.currentTrack.title}</Typography>
				<Typography noWrap variant="caption">{player.currentTrack.artist.name}</Typography>
			</CurrentTrackInfo>
		</CurrentTrackContainer>
	)
}

export default CurrentTrack;