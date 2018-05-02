import React, { Component } from 'react';
import PlayerControls from './PlayerControls';
import QueueList from './QueueList';
import Grid from 'material-ui/Grid';
import Collapse from 'material-ui/transitions/Collapse';
import {Howl, Howler} from 'howler';

import { connect } from 'react-redux';
import * as actions from '../actions';
// class PlayerProgress extends Component {
// 	state = {
// 		time: this.props.player.time,
// 		request: 0,
// 	}

// 	componentDidMount() {
// 		this.setState({
// 			request: requestAnimationFrame(this.tick.bind(this))
// 		});
// 	}

// 	componentWillUnmount() {
// 		cancelAnimationFrame(this.state.request);
// 	}

// 	tick() {
// 		const { player } = this.props;
// 		console.log('playing from PlayerProgress', player.playing)

// 		this.setState({
// 			millis: this.props.player.time,
// 			request: requestAnimationFrame(this.tick.bind(this))
// 		});

// 	}

// 	render() {
// 		const {player} = this.props;
// 		return (<span>time: {this.state.request + this.props.player.time}</span>)
// 	}
// }
// const mapStateToProps = state => {
// 	return {
// 		player: state.player
// 	}
// }
// connect(mapStateToProps, actions)(PlayerProgress)


class PlayerProgress extends Component {
	constructor(props) {
		super(props);

		this.state = {
			timeElapsed: 0,
			lastClearedIncrement: 0,
		}
		this.incrementer = null;
	}

	handleStartTime() {
		console.log('start')
		this.incrementer = setInterval(() => {
			this.setState({ timeElapsed: this.state.timeElapsed + 1})
		}
		, 1000);
	}

	handleStopTime() {
		console.log('stop')
		clearInterval(this.incrementer);
		this.setState({
			lastClearedIncrement: this.incrementer
		});
	}

	render() {
		// this.props.player.playing ? this.handleStartTime() : this.handleStopTime();
		const { time } = this.props;
		// console.log('Player time:', time)
		return (
			<span>[progress bar] time: {time}</span>
		);
	}
}

export class Player extends Component {
	render() {
		const { 
			player, 
			time,
			handleStopTrack,
			handlePlayTrack,
			handlePauseTrack,
			handlePlayNext,
			handlePlayPrev,
			handleToggleQueue,
			handlePlayFromQueue,
		} = this.props;

		const styles = {
			root: {
			  position: 'fixed',
			  bottom: '56px', // Makes room for bottom Nav componenet
			  width: '100%',
			  boxShadow: '0px -1px 20px 1px #ccc',
			  background: '#fff',
			  padding: '0'
			}
		};
		
		// [CONTRACT]
		// If player.queue has tracks: 
		// * render controls and queue list.
		// * pass player action handlers to PLayerControls component.
		// * render QueueList with queue and currentTrack props inside MUI Collapse component.
		// Otherwise: Player component is an empty div.
		return (
			<div style={styles.root}>
				{	player.queue.length > 0 &&
					<div>
						<div><PlayerProgress player={player} time={time} /></div>
						<Grid container>
							<Grid item xs={12}>
								<PlayerControls 
									player={player}
									handleStopTrack={handleStopTrack}
									handlePlayTrack={handlePlayTrack}
									handlePauseTrack={handlePauseTrack}
									handlePlayNext={handlePlayNext}
									handlePlayPrev={handlePlayPrev}
									handleToggleQueue={handleToggleQueue}
								/>
							</Grid>
						</Grid>
						<Collapse direction="up" in={player.showQueue} collapsedHeight="0px">
							<QueueList 
								queue={player.queue} 
								queueIndex={player.queueIndex}
								currentTrack={player.currentTrack} 
								handleStopTrack={handleStopTrack}
								handlePlayTrack={handlePlayTrack}
								handlePlayFromQueue={handlePlayFromQueue}
							/>
						</Collapse>
					</div>
				}
			</div>
		);
	}
}

export default Player;
