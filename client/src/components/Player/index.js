import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	ThemeContext,
	getSecondaryBackgroundColor,
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
			<div 
				//style={{zIndex: isOpen || isDragging ? 1 : 0}}
				// className={classes.root}
				style={{
					position: 'fixed',
				  bottom: 0,
				  width: '100%',
				  zIndex: 1,
				}}
			>
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
					<div
						id="player-handle" 
						style={{
							boxShadow: !isOpen ? '0px -1px 20px 1px #ccc' : 'none',
							transition: dragEndTransition,
							margin: '0 auto',
							maxWidth: !userAgentIsMobile ? theme.dimensions.libraryDesktop.maxWidth : '100%',
						}}
						// className={userAgentIsMobile ? classes.containerMobile : classes.containerDesktop}
					>
						<div style={{
							backgroundColor: getSecondaryBackgroundColor({theme}),
							display: 'flex',
							width: '100%',
						}}>
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
						</div>
						<div style={{
							background: theme.palette.secondary.light,
							position: 'absolute',
							height: window.innerHeight - theme.dimensions.player.height,
							width: '100%',
						}}>
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
										width={userAgentIsMobile ? window.innerWidth : theme.dimensions.player.width}
										height={userAgentIsMobile ? window.innerWidth : theme.dimensions.player.width}
									/>
								</div>
							}
						</div>
						<div style={{
							backgroundColor: getSecondaryBackgroundColor({theme}), 
							position: 'fixed',
							width: '100%',
							bottom: !isOpen ? theme.dimensions.player.height : (windowHeight - (theme.dimensions.player.height * 2)) * -1,
							zIndex: 1000,
						}}>
							<PlayerProgress 
								player={player}
								playerIsOpen={isOpen}
								userAgentIsMobile={userAgentIsMobile}
								handleSeek={handleSeek}
							/>
						</div>
						<div style={{
								backgroundColor: getSecondaryBackgroundColor({theme}), 
								position: 'fixed',
								display: 'flex',
								width: '100%',
								bottom: isOpen ? (windowHeight - theme.dimensions.player.height) * -1 : 0,
							}}
						>
							{ !isOpen &&
								<CurrentTrack 
									player={player}
									playerIsOpen={isOpen}
								/>
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
						</div>
					</div>
				</Draggable>
			</div>
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
