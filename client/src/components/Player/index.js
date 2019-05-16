import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const WINDOW_TOP = window.innerHeight * -1;
const TRIGGER_DRAG_DISTANCE = WINDOW_TOP / 3;
const DRAG_TRANSITION = 'all .5s ease';

const Container = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 1;
`

const LayoutContainer = styled.div`
	// background-color: ${getSecondaryBackgroundColor};
	box-shadow: ${props => (!props.userAgentIsMobile && props.isOpen) ? 'none' : '0px -1px 20px 1px #ccc'};
	// *** BUG: transition does not work using styled components ***
	transition: ${props => {console.log('dragEndTransition', props.dragEndTransition); return props.dragEndTransition}};
	margin: 0 auto;
	max-width: ${props=> !props.userAgentIsMobile ? `${getPlayerWidth(props)}px` : '100%'};
`

const TopPanel = styled.div`
	background-color: ${getSecondaryBackgroundColor};
	display: flex;
	width: 100%;
`

const QueueContainer = styled.div`
	background-color: ${getSecondaryBackgroundColor};
	position: absolute;
	height: ${props => props.windowHeight - getPlayerHeight(props)}px;
	width: 100%;
`

const PlayerProgressContainer = styled.div`
	background-color: ${getSecondaryBackgroundColor};
	position: fixed;
	width: 100%;
	bottom: ${props => !props.isOpen ? getPlayerHeight(props) : (props.windowHeight - (getPlayerHeight(props) * 2)) * -1}px;
	z-index: 1000;
`

const BottomPanel = styled.div`
	background-color: ${getSecondaryBackgroundColor};
	position: fixed;
	display: flex;
	width: 100%;
	bottom: ${props => props.isOpen ? (props.windowHeight - getPlayerHeight(props)) * -1 : 0}px;
`

export class Player extends Component {
	static contextType = ThemeContext;

	constructor(props) {
		super(props)
		this.state = {
			isOpen: false,
			isDragging: false,
			showQueue: true,
			position: 0,
			windowHeight: window.innerHeight,
			dragEndTransition: 'none',
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
	}

	handleWindowResize = e => {
		this.setState({windowHeight: e.target.innerHeight});
	}
	
	handleDragStart = (e) => {
		// console.log('*** drag start', e)
		this.setState({dragEndTransition: 'none'})
	}

	handleDrag = (e, data) => {
		// console.log('Player, handleDrag, e:', e.changedTouches[0].clientY)
		this.setState({isDragging: true});
	}

	handleDragStop = (e, data) => {
		const { isOpen } = this.state;

		const touchPos = data.y

		// console.log('*** drag end', touchPos, WINDOW_TOP)
		if (!isOpen & touchPos < TRIGGER_DRAG_DISTANCE || isOpen & touchPos < TRIGGER_DRAG_DISTANCE * 2) {
			this.setState({
				isOpen: true,
				isDragging: false,
				position: WINDOW_TOP + this.context.dimensions.player.height,
				dragEndTransition: DRAG_TRANSITION,
			});
			return console.log('UP')
		}
		this.setState({
			isOpen: false,
			isDragging: false,
			position: 0,
			dragEndTransition: DRAG_TRANSITION,
		});
		console.log('DOWN')
		// return true;
	}

	handlePlayerToggle = () => {
		const { isOpen } = this.state;

		if (!isOpen) {
			this.setState({
				isOpen: true,
				position: WINDOW_TOP + this.context.dimensions.player.height,
				dragEndTransition: DRAG_TRANSITION,
			});
			return console.log('UP')
		}
		this.setState({
			isOpen: false,
			position: 0,
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
			<Container>
				{ !userAgentIsMobile && 
					<Backdrop 
						open={isOpen} 
						onBackdropClick={this.handlePlayerToggle} 
					/>
				}
				<Draggable
					handle="#player-handle"
					disabled={!userAgentIsMobile}
					axis="y"
					defaultPosition={{x: 0, y: 0}}
	        position={{x: 0, y: position}}
	        scale={1}
					onStart={this.handleDragStart}
					onDrag={this.handleDrag}
					onStop={this.handleDragStop}
				>
					<LayoutContainer
						id="player-handle" 
						theme={theme}
						dragEndTransition={dragEndTransition}
						userAgentIsMobile={userAgentIsMobile}
						iOpen={isOpen}
					>
						<TopPanel theme={theme}>
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
						<QueueContainer theme={theme} windowHeight={windowHeight}>
							{ showQueue ?
								<QueueList 
									queue={player.queue}
									playerIsOpen={isOpen}
									queueIndex={player.queueIndex}
									currentTrack={player.currentTrack} 
									handleStopTrack={handleStopTrack}
									handlePlayTrack={handlePlayTrack}
									handlePlayFromQueue={handlePlayFromQueue}
								/>
								:
								<div style={{display: 'flex'}}>
									<img 
										src={player.currentTrack.image.src} 
										alt={`Album art for ${player.currentTrack.album.title}`}
										width={userAgentIsMobile ? window.innerWidth : getPlayerWidth({theme})}
										height={userAgentIsMobile ? window.innerWidth : getPlayerWidth({theme})}
									/>
								</div>
							}
						</QueueContainer>
						<PlayerProgressContainer 
							theme={theme}
							isOpen={isOpen}
							windowHeight={windowHeight}
						>
							<PlayerProgress 
								player={player}
								playerIsOpen={isOpen}
								userAgentIsMobile={userAgentIsMobile}
								handleSeek={handleSeek}
							/>
						</PlayerProgressContainer>
						<BottomPanel 
							theme={theme}
							isOpen={isOpen}
							windowHeight={windowHeight}
						>
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
					</LayoutContainer>
				</Draggable>
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
