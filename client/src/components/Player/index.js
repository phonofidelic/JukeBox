import React, { Component } from 'react';
import styles from './Player.styles';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../contexts/theme.context';
// import {Howl, Howler} from 'howler';
import PlayerProgress from './PlayerProgress';
import PlayerControls from './PlayerControls';
import QueueList from './QueueList';

import Draggable from 'react-draggable';

// import Collapse from '@material-ui/core/Collapse';
import withStyles from '@material-ui/core/styles/withStyles';

const WINDOW_TOP = window.innerHeight * -1;
const TRIGGER_DRAG_DISTANCE = WINDOW_TOP / 3;

export class Player extends Component {
	static contextType = ThemeContext;

	constructor(props) {
		super(props)
		this.state = {
			isOpen: false,
			position: 0,
		}
	}
	
	handleDragStart = (e) => {
		// e.preventDefault()
		// e.stopImmediatePropagation();
		console.log('*** drag start', e)
		// return true;
	}

	handleDrag = (e, data) => {
		// e.stopImmediatePropagation();
		// e.preventDefault();
		console.log('*** draging', data)
		return true;
	}

	handleDragStop = (e, data) => {
		// e.stopImmediatePropagation();
		// e.preventDefault()
		const { isOpen } = this.state;

		const touchPos = data.y

		console.log('*** drag end', touchPos, WINDOW_TOP)
		if (!isOpen & touchPos < TRIGGER_DRAG_DISTANCE || isOpen & touchPos < TRIGGER_DRAG_DISTANCE * 2) {
			this.setState({
				isOpen: true,
				position: WINDOW_TOP + this.context.dimensions.player.height,
			});
			return console.log('UP')
		}
		this.setState({
			isOpen: false,
			position: 0,
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
			});
			return console.log('UP')
		}
		this.setState({
			isOpen: false,
			position: 0,
		});
		console.log('DOWN')
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
			classes,
		} = this.props;

		const { position, isOpen } = this.state;

		return (
			<Draggable
				axis="y"
				defaultPosition={{x: 0, y: 0}}
        position={{x: 0, y: position}}
        scale={1}
				onStart={this.handleDragStart}
				onDrag={this.handleDrag}
				onStop={this.handleDragStop}
			>
				<div 
					className={classes.root}
				>
					<div className={userAgentIsMobile ? classes.containerMobile : classes.containerDesktop}>
						<PlayerProgress 
							player={player}
							handleSeek={handleSeek}
						/>
						<PlayerControls 
							player={player}
							playerIsOpen={isOpen}
							userAgentIsMobile={userAgentIsMobile}
							handleStopTrack={handleStopTrack}
							handlePlayTrack={handlePlayTrack}
							handlePauseTrack={handlePauseTrack}
							handlePlayNext={handlePlayNext}
							handlePlayPrev={handlePlayPrev}
							handlePlayerToggle={this.handlePlayerToggle}
						/>
						<QueueList 
							queue={player.queue}
							queueIndex={player.queueIndex}
							currentTrack={player.currentTrack} 
							handleStopTrack={handleStopTrack}
							handlePlayTrack={handlePlayTrack}
							handlePlayFromQueue={handlePlayFromQueue}
						/>
					</div>
				</div>
			</Draggable>
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

export default withStyles(styles)(Player);
