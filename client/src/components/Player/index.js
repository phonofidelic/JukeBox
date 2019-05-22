import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';

import {
	ThemeContext,
	getSecondaryBackgroundColor,
	getPlayerHeight,
	getPlayerWidth,
	getNavMobileHeight,
} from '../../contexts/theme.context';
import Backdrop from '../Backdrop'

import PlayerProgress from 'components/Player/PlayerProgress';
import PlayerControls from 'components/Player/PlayerControls';
import QueueList from 'components/Player/QueueList';
import CurrentTrack from 'components/Player/CurrentTrack';
import ToggleQueueButton from 'components/Player/ToggleQueueButton';

// import Draggable from 'react-draggable';
import ReactCardFlip from 'react-card-flip';

// const WINDOW_TOP = window.innerHeight * -1;
const TRIGGER_DRAG_DISTANCE = window.innerHeight / 4;
const DRAG_TRANSITION = 'all .5s ease';

// const poseConfig = {
// 	draggable: 'y',
//   dragEnd: {
//     transition: DRAG_TRANSITION,
//     // Player position snaps back to initial pos if isOpen change is not triggered.
//     // Otherwise, open/closed props below override this setting.
//     y: props => props.isOpen ? 0 : window.innerHeight - getPlayerHeight(props),
//   },
//   open: { y: 0 },
//   closed: { y: props => window.innerHeight - getPlayerHeight(props)},
// };

const Container = styled.div`
	position: fixed;
	width: ${props => props.userAgentIsMobile ? '100%' : `${getPlayerWidth(props)}px`};
	margin: 0 auto;
	// top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	z-index: 1;
	// height: ${props => props.isOpen ? '100%' : getPlayerHeight(props) + 'px'};
	transition: ${props => props.dragEndTransition};
`

const LayoutContainer = styled.div`
	position: fixed;
	// top: ${props => props.userAgentIsMobile ? 56 : 0}px; // -56px seems to work initially
	top: ${props => props.isOpen ? 0 : (props.userAgentIsMobile ? -56 : 0)}px;
	bottom: ${props => props.userAgentIsMobile ? getNavMobileHeight(props) * 2 : 0}px;
	background-color: ${getSecondaryBackgroundColor};
	box-shadow: ${props => (!props.userAgentIsMobile && props.isOpen) ? 'none' : '0px -1px 20px 1px #ccc'};
	width: ${props => props.userAgentIsMobile ? '100%' : `${getPlayerWidth(props)}px`};
	z-index: 1;
`

const DraggableLayoutContainer = posed(LayoutContainer)({
	draggable: 'y',
	dragBounds: {
		top: 0,
		bottom: (props) => window.innerHeight - getPlayerHeight(props)
	},
	dragEnd: {
    // Player position snaps back to initial pos if isOpen change is not triggered.
    // Otherwise, open/closed props below override this setting.
    y: props => props.isOpen ? 0 : window.innerHeight - getPlayerHeight(props),
    transition: DRAG_TRANSITION,
  },
	open: {
		y: 0,
		transition: DRAG_TRANSITION,
	},
  closed: {
  	y: props => window.innerHeight - getPlayerHeight(props),
  	transition: DRAG_TRANSITION,
  },
  // closed: { y: 56 },
  // label: 'layout-container',
  // pressable: true,
  // init: { scale: 1 },
  // press: { scale: 0.8 }
})

const TopPanel = styled.div`
	background-color: ${getSecondaryBackgroundColor}
	display: flex;
	width: 100%;
	margin: 0 auto;
`

// const DraggableTopPanel = posed(TopPanel)({
// 	draggable: 'y',
// 	dragBounds: {
// 		top: 0,
// 		bottom: props => window.innerHeight - getPlayerHeight(props)
// 	},
//   dragEnd: {
//     transition: { type: 'spring' },
//     // Player position snaps back to initial pos if isOpen change is not triggered.
//     // Otherwise, open/closed props below override this setting.
//     y: props => props.isOpen ? 0 : window.innerHeight - getPlayerHeight(props),
//   },
//   open: { y: 0 },
//   closed: { y: props => window.innerHeight - getPlayerHeight(props)},
// })

const QueueContainer = styled.div`
	// display: flex;
	width: ${props => props.userAgentIsMobile ? '100%' : `${getPlayerWidth(props)}px`};
	//transition: ${DRAG_TRANSITION};
	// overflow-x: hidden;
`
// const PosedQueueContainer = posed(QueueContainer)({
// 	draggable: 'false',
// });

const PlayerProgressContainer = styled.div`
	//background-color: ${getSecondaryBackgroundColor};
	position: fixed;
	// top: ${(props) => props.isOpen || !props.userAgentIsMobile ? null : 0};
	top: ${props => props.userAgentIsMobile ? 
		(props.isOpen ? null : 0)
		:
		(props.isOpen ? null : 0)
	};
	bottom: ${props => props.userAgentIsMobile ? 
		(props.isOpen  ? `${getNavMobileHeight(props) * 2}px` : null) 
		: 
		(props.isOpen ? `${getNavMobileHeight(props)}px` : null)};
	width: ${props => props.userAgentIsMobile ? '100%' : `${getPlayerWidth(props)}px`};
	z-index: 1000;
	transition: ${props => props.dragEndTransition};
`

const BottomPanel = styled.div`
	background-color: ${props => props.isOpen ? getSecondaryBackgroundColor(props) : 'none'};
	display: flex;
	position: fixed;
	top: ${(props) => props.isOpen ? null : 0};
	bottom: ${props => props.userAgentIsMobile ? getNavMobileHeight(props) : 0}px;
	width: ${props => props.userAgentIsMobile ? '100%' : `${getPlayerWidth(props)}px`};
	// margin-left: auto;
	z-index: 2;
`

export class Player extends Component {
	static contextType = ThemeContext;

	constructor(props) {
		super(props)
		this.state = {
			isOpen: false,
			showQueue: true,
			// position: 0,
			windowHeight: window.innerHeight,
			dragEndTransition: 'none',
			// isDraggable: false
			// isDraggable: true
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
		// e.preventDefault()
		if (!e.changedTouches) return;

		const dragStartPos = e.changedTouches[0].pageY;
		const theme = this.context;
		const { isOpen } = this.state;

		if ( isOpen & dragStartPos > getPlayerHeight({theme})) {
			// return this.setState({isDraggable: false});
		}

		console.log('handleDragStart, e', dragStartPos)
		this.setState({
			...this.state,
			dragStartPos: dragStartPos,
			// isDraggable: true
		})
	}

	handleDrag = (e, data) => {
		// console.log('Player, handleDrag, e:', e.changedTouches[0].clientY)
	}

	handleDragStop = (e) => {
		if (!e.changedTouches) return;
		console.log('handleDragStop, e', e.changedTouches[0].pageY)
		const { isOpen } = this.state;
		const theme = this.context;
		const { dragStartPos } = this.state;
		const dragEndPos = e.changedTouches[0].pageY;

		let touchDelta = dragStartPos - dragEndPos;
		if (touchDelta < 0) touchDelta = touchDelta * -1;
		console.log('touchDelta:', touchDelta)
		if (touchDelta < TRIGGER_DRAG_DISTANCE) return;

		// If player is open and dragStartPos is within the queue list area
		// if ( isOpen & dragStartPos > getPlayerHeight({theme})) return;

		console.log('*** drag end', dragEndPos, TRIGGER_DRAG_DISTANCE)
		if (!isOpen & dragEndPos < window.innerHeight - TRIGGER_DRAG_DISTANCE || isOpen & dragEndPos < TRIGGER_DRAG_DISTANCE) {
			this.setState({
				isOpen: true,
				// translatePos: 0,
			});
			return console.log('UP')
		}
		this.setState({
			isOpen: false,
		});
		console.log('DOWN')
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
			showQueue,
			// position,
			windowHeight,
			dragEndTransition,
			// isDraggable,
		} = this.state;

		const theme = this.context;

		console.log('isOpen:', this.state.isOpen)
		return (
			<Container 
				theme={theme} 
				isOpen={isOpen}
				windowHeight={windowHeight}
				userAgentIsMobile={userAgentIsMobile}
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
						isOpen={isOpen}
						onDragStart={this.handleDragStart}
						onDragEnd={this.handleDragStop}
						//dragEndTransition={'y'}
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
							userAgentIsMobile={userAgentIsMobile}
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
							userAgentIsMobile={userAgentIsMobile}
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
