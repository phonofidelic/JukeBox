import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';

import {
	ThemeContext,
	getSecondaryBackgroundColor,
	getPlayerHeight,
	getPlayerWidth,
} from '../../contexts/theme.context';
import Backdrop from '../Backdrop'

import PlayerProgress from 'components/Player/PlayerProgress';
import PlayerControls from 'components/Player/PlayerControls';
import QueueList from 'components/Player/QueueList';
import CurrentTrack from 'components/Player/CurrentTrack';
import ToggleQueueButton from 'components/Player/ToggleQueueButton';

import Draggable from 'react-draggable';
import ReactCardFlip from 'react-card-flip';

const WINDOW_TOP = window.innerHeight * -1;
const TRIGGER_DRAG_DISTANCE = window.innerHeight / 3;
const DRAG_TRANSITION = 'all .5s ease';

const poseConfig = {
	draggable: 'y', 
  dragEnd: {
    transition: DRAG_TRANSITION,
  },
  open: { y: 0 },
  closed: { y: window.innerHeight - 56},
  // dragBounds: {
  // 	// bottom: 0,
  // 	top: (window.innerheight - ),
  // }
};

const Container = styled.div`
	background-color: ${getSecondaryBackgroundColor};
	position: fixed;
	width: ${props => props.userAgentIsMobile ? '100%' : `${getPlayerWidth(props)}px`};
	margin: 0 auto;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	z-index: 1;
	height: ${props => props.isOpen ? '100%' : getPlayerHeight(props) + 'px'};
	transition: ${props => props.dragEndTransition};
`

const DraggableContainer = posed(Container)(poseConfig)

const LayoutContainer = styled.div`
	box-shadow: ${props => (!props.userAgentIsMobile && props.isOpen) ? 'none' : '0px -1px 20px 1px #ccc'};
	width: ${props => props.userAgentIsMobile ? '100%' : `${getPlayerWidth(props)}px`};
	// position: fixed;
	//bottom: ${props => props.position}px;
	// transition: ${props => props.dragEndTransition};
`

const DraggableLayoutContainer = posed(LayoutContainer)(poseConfig)

const TopPanel = styled.div`
	background-color: ${getSecondaryBackgroundColor}
	display: flex;
	width: 100%;
	margin: 0 auto;
`

const DraggableTopPanel = posed(TopPanel)(poseConfig)

const QueueContainer = styled.div`
	width: ${props => props.userAgentIsMobile ? '100%' : `${getPlayerWidth(props)}px`};
	transition: ${DRAG_TRANSITION};
`

const PlayerProgressContainer = styled.div`
	background-color: ${getSecondaryBackgroundColor};
	position: fixed;
	width: ${props => props.userAgentIsMobile ? '100%' : `${getPlayerWidth(props)}px`};
	bottom: ${getPlayerHeight}px;
	z-index: 1000;
	transition: ${props => props.dragEndTransition};
`

const BottomPanel = styled.div`
	background-color: ${props => props.isOpen ? getSecondaryBackgroundColor(props) : 'none'};
	position: fixed;
	bottom: 0;
	width: ${props => props.userAgentIsMobile ? '100%' : `${getPlayerWidth(props)}px`};
	// margin-left: auto;
	z-index: 2;
`

export class Player extends Component {
	static contextType = ThemeContext;

	constructor(props) {
		super(props)
		this.ref = React.createRef();
		this.state = {
			isOpen: false,
			// isDragging: false,
			showQueue: true,
			position: 0,
			windowHeight: window.innerHeight,
			dragEndTransition: 'none',
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowResize.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
	}

	handleWindowResize(e) {
		const theme = this.context;
		console.log('QueueContainer height:', (e.target.innerHeight - getPlayerHeight({theme})))
		this.setState({windowHeight: e.target.innerHeight});
	}
	
	handleDragStart = (e) => {
		// console.log('*** drag start', e)
		// this.setState({dragEndTransition: 'none'})
	}

	handleDrag = (e, data) => {
		// console.log('Player, handleDrag, e:', e.changedTouches[0].clientY)
		// this.setState({isDragging: true});
	}

	handleDragStop = (e, data) => {
		// console.log('ref:', this.ref)
		if (!e.changedTouches) return;
		console.log('handleDragStop, e', e.changedTouches[0].pageY)
		const { isOpen } = this.state;
		const theme = this.context;
		const touchPos = e.changedTouches[0].pageY

		console.log('*** drag end', touchPos, TRIGGER_DRAG_DISTANCE)
		if (!isOpen & touchPos < TRIGGER_DRAG_DISTANCE || isOpen & touchPos < TRIGGER_DRAG_DISTANCE * 2) {
			this.setState({
				isOpen: true,
				// position: getPlayerHeight({theme}) * -1,
				// dragEndTransition: DRAG_TRANSITION,
			});
			return console.log('UP')
		}
		this.setState({
			isOpen: false,
			// isDragging: false,
			// position: 0,
			// dragEndTransition: DRAG_TRANSITION,
		});
		console.log('DOWN')
		// return true;
	}

	handlePlayerToggle = () => {
		const { isOpen } = this.state;
		const theme = this.context;

		if (!isOpen) {
			this.setState({
				isOpen: true,
				position: getPlayerHeight({theme}) * -1,
				dragEndTransition: DRAG_TRANSITION,
			});
			return console.log('UP')
		}
		this.setState({
			isOpen: false,
			position: 0,
			// position: getPlayerHeight({theme}),
			dragEndTransition: DRAG_TRANSITION,
		});
		console.log('DOWN')
	}

	handleQueueToggle = () => {
		console.log('handleQueueToggle')
		this.setState({showQueue: !this.state.showQueue})
	}

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
			handleSeek,
			// classes,
		} = this.props;

		const {
			isOpen,
			// isDragging,
			showQueue,
			position,
			windowHeight,
			dragEndTransition,
		} = this.state;

		const theme = this.context;

		// console.log('isOpen:', isOpen)
		return (
			<Container 
				theme={theme} 
				isOpen={isOpen}
				windowHeight={windowHeight}
				userAgentIsMobile={userAgentIsMobile}
				dragEndTransition={dragEndTransition}
				//onDragStart={this.handleDragStart}
				//onDragEnd={this.handleDragStop}
				position={position}
			>
				{ !userAgentIsMobile && 
					<Backdrop 
						open={isOpen} 
						onBackdropClick={this.handlePlayerToggle} 
					/>
				}
					<DraggableLayoutContainer
						id="player_layout-container" 
						theme={theme}
						userAgentIsMobile={userAgentIsMobile}
						onDragStart={this.handleDragStart}
						onDragEnd={this.handleDragStop}
						//position={position}
						dragEndTransition={'y'}
						dragBounds={{
							top: 0,
							bottom: window.innerHeight - getPlayerHeight({theme}),
						}}
						pose={isOpen ? 'open' : 'closed'}
					>
						<TopPanel 
							id="player_top-panel" 
							theme={theme}
							isOpen={isOpen}
						>
							<CurrentTrack 
								player={player}
								playerIsOpen={isOpen}
							/>
							{isOpen &&
								<ToggleQueueButton
									showQueue={showQueue}
									handleQueueToggle={this.handleQueueToggle}
								/>
							}
						</TopPanel>
						<QueueContainer
							id="player_queue-container"
							theme={theme} 
							isOpen={isOpen}
							windowHeight={windowHeight}
						>
							<ReactCardFlip 
								//type="horizontal"
								isFlipped={!showQueue}
								//style={{width: '100%'}}
							>
								<QueueList 
									key="front"
									queue={player.queue}
									playerIsOpen={isOpen}
									windowHeight={windowHeight}
									queueIndex={player.queueIndex}
									currentTrack={player.currentTrack} 
									handleStopTrack={handleStopTrack}
									handlePlayTrack={handlePlayTrack}
									handlePlayFromQueue={handlePlayFromQueue}
								/>
								<div 
									key="back"
									style={{display: 'flex'}}
								>
									<img 
										src={player.currentTrack.image.src} 
										alt={`Album art for ${player.currentTrack.album.title}`}
										width={userAgentIsMobile ? window.innerWidth : getPlayerWidth({theme})}
										height={userAgentIsMobile ? window.innerWidth : getPlayerWidth({theme})}
									/>
								</div>
							</ReactCardFlip>
						</QueueContainer>
						<PlayerProgressContainer
							id="player_progress-container" 
							theme={theme}
							isOpen={isOpen}
							windowHeight={windowHeight}
							dragEndTransition={dragEndTransition}
						>
							<PlayerProgress 
								player={player}
								playerIsOpen={isOpen}
								userAgentIsMobile={userAgentIsMobile}
								handleSeek={handleSeek}
							/>
						</PlayerProgressContainer>
						<BottomPanel 
							id="player_bottom-panel"
							theme={theme}
							isOpen={isOpen}
							windowHeight={windowHeight}
							userAgentIsMobile={userAgentIsMobile}
						>
							{(userAgentIsMobile && !isOpen) && 
								<div style={{ display: 'flex', width: '100%' }}></div>
							}
							<PlayerControls
								player={player}
								playerIsOpen={isOpen}
								userAgentIsMobile={userAgentIsMobile}
								handlePlayTrack={handlePlayTrack}
								handlePauseTrack={handlePauseTrack}
								handlePlayNext={handlePlayNext}
								handlePlayPrev={handlePlayPrev}
								handlePlayerToggle={this.handlePlayerToggle}
							/>
						</BottomPanel>
					</DraggableLayoutContainer>
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
	handleSeek: PropTypes.func.isRequired,
}

export default Player;
