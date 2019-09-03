import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';
import {
  ThemeContext,
  getSecondaryBackgroundColor,
  getPlayerHeight,
  getPlayerWidth,
  getNavMobileHeight
} from '../../contexts/theme.context';
import ReactCardFlip from 'react-card-flip';

import Backdrop from '../Backdrop';
import PlayerProgress from 'components/Player/PlayerProgress';
import PlayerControls from 'components/Player/PlayerControls';
import QueueList from 'components/Player/QueueList';
import CurrentTrack from 'components/Player/CurrentTrack';
import ToggleQueueButton from 'components/Player/ToggleQueueButton';

const Container = styled.div`
  background-color: ${getSecondaryBackgroundColor};
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
  box-shadow: ${({ theme }) => theme.palette.primary.boxShadow};
`;

const QueueContainer = styled.div`
  background-color: ${getSecondaryBackgroundColor};
  // display: ${({ userAgentIsMobile }) =>
    userAgentIsMobile ? 'block' : 'flex'};
  justify-content: flex-end;
  width: 500px;
  height: 500px;
  position: fixed;
  right: ${({ userAgentIsMobile }) => (userAgentIsMobile ? 0 : 10)}px;
  bottom: ${({ theme, isOpen }) =>
    isOpen
      ? theme.dimensions.playerProgressOpen.height +
        theme.dimensions.player.height
      : -500 -
        (theme.dimensions.playerProgressOpen.height +
          theme.dimensions.player.height)}px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transition: bottom 0.3s ease;
  z-index: -1;
  box-shadow: ${({ theme }) => theme.palette.primary.boxShadow};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CurrentTrackContainer = styled.div`
  background-color: ${getSecondaryBackgroundColor};
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 1;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
`;

const PlayerProgressContainer = styled.div`
  // background-color: ${getSecondaryBackgroundColor};
`;

const PlayerPanel = styled.div`
  background: ${getSecondaryBackgroundColor};
  display: flex;
  justify-content: center;
  margin-bottom: ${({ userAgentIsMobile }) =>
    userAgentIsMobile ? getPlayerHeight : 0}px;
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

    const {
      isOpen,
      showQueue,
      windowHeight,
      dragEndTransition,
      isDraggable
    } = this.state;

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
          <CurrentTrackContainer theme={theme}>
            <CurrentTrack
              theme={theme}
              currentTrack={player.currentTrack}
              playerIsOpen={isOpen}
            />
          </CurrentTrackContainer>
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
          id="player_bottom-panel"
          theme={theme}
          isOpen={isOpen}
          windowHeight={windowHeight}
          userAgentIsMobile={userAgentIsMobile}
        >
          {/* {userAgentIsMobile && !isOpen && (
            <div style={{ display: 'flex', width: '100%' }}></div>
          )} */}
          <CurrentTrack
            currentTrack={player.currentTrack}
            playerIsOpen={isOpen}
          />
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
