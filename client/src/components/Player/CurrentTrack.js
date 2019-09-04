import React, { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext, getPlayerHeight } from '../../contexts/theme.context';

import Typography from '@material-ui/core/Typography';

const CurrentTrackContainer = styled.div`
  // flex: 1;
  display: flex;
  text-align: left;
  height: ${getPlayerHeight}px;
  z-index: 1;
`;
const CurrentTrackImage = styled.div``;

const CurrentTrackInfo = styled.div`
	// width: ${props => (props.playerIsOpen ? '100%' : '120px')};
	padding: 8px;
`;

const CurrentTrack = props => {
  const { currentTrack, playerIsOpen } = props;

  const theme = useContext(ThemeContext);

  return (
    <CurrentTrackContainer
      id="player_current-track"
      theme={theme}
      style={{ height: theme.dimensions.player.height }}
    >
      <CurrentTrackImage theme={theme}>
        <img
          src={currentTrack.image.src}
          alt="Album art"
          width={theme.dimensions.player.height}
          height={theme.dimensions.player.height}
        />
      </CurrentTrackImage>
      <CurrentTrackInfo theme={theme} playerIsOpen={playerIsOpen}>
        <Typography noWrap>{currentTrack.title}</Typography>
        <Typography noWrap variant="caption">
          {currentTrack.artist.name}
        </Typography>
      </CurrentTrackInfo>
    </CurrentTrackContainer>
  );
};

export default CurrentTrack;
