import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  ThemeContext,
  getSecondaryBackgroundColor,
  getPlayerWidth
} from '../../contexts/theme.context';
import ReactCardFlip from 'react-card-flip';

import PlayerProgress from 'components/Player/PlayerProgress';
import PlayerControls from 'components/Player/PlayerControls';
import QueueList from 'components/Player/QueueList';
import CurrentTrack from 'components/Player/CurrentTrack';

const Container = styled.div`
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 3;
  // box-shadow: ${({ theme }) => theme.palette.primary.boxShadow};
  box-shadow: 0px 0px 10px rgba(227, 36, 36, .3);
`;

const QueueContainer = styled.div`
  background-color: ${getSecondaryBackgroundColor};
  justify-content: flex-end;
  width: 500px;
  height: 500px;
  position: fixed;
  right: ${({ userAgentIsMobile }) => (userAgentIsMobile ? 0 : 10)}px;
  bottom: ${({ theme, isOpen }) =>
    isOpen
      ? theme.dimensions.player.height + 10
      : -500 - theme.dimensions.player.height}px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transition: bottom 0.3s ease;
  z-index: -1;
  box-shadow: ${({ theme }) => theme.palette.primary.boxShadow};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PlayerProgressContainer = styled.div`
  // background-color: ${getSecondaryBackgroundColor};
  position: fixed;
  width: 100%;
  bottom: ${({ theme, userAgentIsMobile }) =>
    userAgentIsMobile
      ? theme.dimensions.player.height + theme.dimensions.navMobile.height - 6
      : theme.dimensions.player.height - 6}px;
  z-index: 2;
`;

const PlayerPanel = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme, userAgentIsMobile }) =>
    userAgentIsMobile ? theme.dimensions.navMobile.height : 0}px;
`;

const CurrentTrackPlayerContainer = styled.div`
  width: 56px;
`;

const CurrentTrackQueueContainer = styled.div`
  background-color: ${getSecondaryBackgroundColor};
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 1;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
`;

export class Player extends Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      showQueue: true,
      windowHeight: window.innerHeight,
      dragEndTransition: 'none'
    };
  }

  handlePlayerToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleToggleQueue = () => {
    console.log('handleToggleQueue');
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const {
      player,
      userAgentIsMobile,
      handleStopTrack,
      handlePlayTrack,
      handlePauseTrack,
      handlePlayNext,
      handlePlayPrev,
      handlePlayFromQueue,
      handleSeek
      // classes,
    } = this.props;

    const { isOpen, showQueue, windowHeight, dragEndTransition } = this.state;

    const theme = this.context;

    return (
      <Container
        id="player"
        theme={theme}
        isOpen={isOpen}
        windowHeight={windowHeight}
        userAgentIsMobile={userAgentIsMobile}
      >
        <QueueContainer
          id="player_queue-container"
          theme={theme}
          isOpen={isOpen}
          userAgentIsMobile={userAgentIsMobile}
          windowHeight={windowHeight}
        >
          <CurrentTrackQueueContainer theme={theme}>
            <CurrentTrack
              theme={theme}
              currentTrack={player.currentTrack}
              playerIsOpen={isOpen}
            />
          </CurrentTrackQueueContainer>
          <ReactCardFlip
            //type="horizontal"
            isFlipped={!showQueue}
          >
            <QueueList
              key="front"
              queue={player.queue}
              // isOpen={isOpen}
              playerIsOpen={isOpen}
              windowHeight={windowHeight}
              queueIndex={player.queueIndex}
              currentTrack={player.currentTrack}
              handleStopTrack={handleStopTrack}
              handlePlayTrack={handlePlayTrack}
              handlePlayFromQueue={handlePlayFromQueue}
            />
            <div key="back" style={{ display: 'flex' }}>
              <img
                src={player.currentTrack.image.src}
                alt={`Album art for ${player.currentTrack.album.title}`}
                width={
                  userAgentIsMobile
                    ? window.innerWidth
                    : getPlayerWidth({ theme })
                }
                height={
                  userAgentIsMobile
                    ? window.innerWidth
                    : getPlayerWidth({ theme })
                }
              />
            </div>
          </ReactCardFlip>
        </QueueContainer>

        <PlayerProgressContainer
          id="player_progress-container"
          theme={theme}
          userAgentIsMobile={userAgentIsMobile}
          isOpen={isOpen}
          windowHeight={windowHeight}
          dragEndTransition={dragEndTransition}
        >
          <PlayerProgress
            theme={theme}
            player={player}
            playerIsOpen={isOpen}
            userAgentIsMobile={userAgentIsMobile}
            handleSeek={handleSeek}
          />
        </PlayerProgressContainer>
        <PlayerPanel
          id="player_panel"
          theme={theme}
          isOpen={isOpen}
          windowHeight={windowHeight}
          userAgentIsMobile={userAgentIsMobile}
        >
          <CurrentTrackPlayerContainer>
            <CurrentTrack
              currentTrack={player.currentTrack}
              playerIsOpen={isOpen}
            />
          </CurrentTrackPlayerContainer>
          <PlayerControls
            player={player}
            queueIsOpen={isOpen}
            userAgentIsMobile={userAgentIsMobile}
            handlePlayTrack={handlePlayTrack}
            handlePauseTrack={handlePauseTrack}
            handlePlayNext={handlePlayNext}
            handlePlayPrev={handlePlayPrev}
            handleToggleQueue={this.handleToggleQueue}
          />
        </PlayerPanel>
      </Container>
    );
  }
}

Player.propTypes = {
  player: PropTypes.object.isRequired,
  userAgentIsMobile: PropTypes.bool.isRequired,
  handlePlayTrack: PropTypes.func.isRequired,
  handlePauseTrack: PropTypes.func.isRequired,
  handleStopTrack: PropTypes.func.isRequired,
  handlePlayNext: PropTypes.func.isRequired,
  handlePlayPrev: PropTypes.func.isRequired,
  handlePlayFromQueue: PropTypes.func.isRequired,
  handleSeek: PropTypes.func.isRequired
};

export default Player;
