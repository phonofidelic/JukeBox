import React, { Component } from 'react';
import styled from 'styled-components';
import { ThemeContext, getPlayerHeight } from '../../contexts/theme.context';

import IconButton from '@material-ui/core/IconButton';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import SkipNext from '@material-ui/icons/SkipNext';
import QueueMusic from '@material-ui/icons/QueueMusic';

const Container = styled.div`
  // border: 1px solid green;
  background: ${({ theme, userAgentIsMobile }) =>
    userAgentIsMobile ? theme.palette.secondary.light : 'none'};
  flex: 2;
  display: flex;
  height: ${getPlayerHeight}px;
  // justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Control = styled.div`
  // border: 1px solid red;
  flex: 1;
  flex-grow: 1;
  max-width: 80px;
`;

const ToggleButtonContainer = styled.div`
  // display: flex;
  width: 50px;
`;

class PlayerControls extends Component {
  static contextType = ThemeContext;

  render() {
    const {
      player,
      queueIsOpen,
      userAgentIsMobile,
      handlePlayTrack,
      handlePauseTrack,
      handlePlayNext,
      handlePlayPrev,
      handleToggleQueue
    } = this.props;

    const theme = this.context;

    return (
      <Container
        id="player_controls"
        theme={theme}
        userAgentIsMobile={userAgentIsMobile}
      >
        <Control style={{ marginLeft: !userAgentIsMobile ? 'auto' : 0 }}>
          <IconButton
            disabled={player.queueIndex === 0}
            onClick={handlePlayPrev}
          >
            <SkipPrevious />
          </IconButton>
        </Control>
        <Control>
          {!player.playing ? (
            <IconButton onClick={handlePlayTrack}>
              <PlayArrow />
            </IconButton>
          ) : (
            <IconButton onClick={handlePauseTrack}>
              <Pause />
            </IconButton>
          )}
        </Control>
        <Control>
          <IconButton
            disabled={player.queueIndex + 1 === player.queue.length}
            onClick={handlePlayNext}
          >
            <SkipNext />
          </IconButton>
        </Control>
        <Control style={{ marginLeft: 'auto' }}>
          <ToggleButtonContainer>
            <IconButton onClick={handleToggleQueue}>
              {queueIsOpen ? (
                <QueueMusic style={{ color: theme.palette.secondary.main }} />
              ) : (
                <QueueMusic />
              )}
            </IconButton>
          </ToggleButtonContainer>
        </Control>
      </Container>
    );
  }
}

export default PlayerControls;
