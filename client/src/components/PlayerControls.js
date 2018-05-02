import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import { 
	Pause, 
	PlayArrow, 
	SkipPrevious, 
	SkipNext,
	MoreVert,
	MoreHoriz
} from 'material-ui-icons';

class PlayerControls extends Component {
	state = {
		touch: null
	}

	handleTouchStart(e) {
		console.log('touch-start', e.targetTouches);
		// Set new starting touch reference
		this.setState({touch: e.targetTouches[0].clientY})

		// Fix player position to touch Y position
	}

	handleTouchMove(e) {
		console.log('touch-move', e.targetTouches);

		// Update player position to touch Y position
	}

	handleTouchEnd(e) {
		const {player, handleToggleQueue} = this.props;
		console.log('touch-end', e.targetTouches);
		// if(e.targetTouches.length) console.log('touch-end, touch diff', touch - e.targetTouches[0].clientY);
		
		// If touch has lower clientY (higher screen pos) at end,
		// handle show queue
		// If touch has higher clientY (lower screen pos) at end,
		// handle hide queue
		if(e.targetTouches.length && this.state.touch - e.targetTouches[0].clientY > 0) {
			console.log('OPEN');
			// If queue is not already opoen, open it
			!player.showQueue ? handleToggleQueue() : null;
		} else if(e.targetTouches.length && this.state.touch - e.targetTouches[0].clientY < 0){
			console.log('CLOSE');
			// If queue is not already closed, close it
			player.showQueue ? handleToggleQueue() : null;
		}
	}

	handleTouchCancel(e) {
		console.log('touch-cancel', e.targetTouches);
	}

	render() {
		const {
			player,
			handleStopTrack,
			handlePlayTrack,
			handlePauseTrack,
			handlePlayNext,
			handlePlayPrev,
			handleToggleQueue
		} = this.props;

		return (
			<Grid 
				container 
				alignItems="center">
				<Grid item xs={12}>
					<IconButton disabled={player.queueIndex === 0} onClick={ handlePlayPrev }>
						<SkipPrevious />
					</IconButton>
					{
						!player.playing ? 
						<IconButton onClick={ handlePlayTrack }>
							<PlayArrow />
						</IconButton>
						: 
						<IconButton onClick={ handlePauseTrack }>
							<Pause />
						</IconButton>
					}
					<IconButton 
						disabled={player.queueIndex+1 === player.queue.length} 
						onClick={ handlePlayNext }>
						<SkipNext />
					</IconButton>
				</Grid>
				<div style={{position: 'fixed', right: '0px', zIndex: '1001'}}>
					<IconButton 
						onClick={ handleToggleQueue }
						onTouchStart={this.handleTouchStart.bind(this)}
						onTouchMove={this.handleTouchMove.bind(this)}
						onTouchEnd={this.handleTouchEnd.bind(this)}
						onTouchCancel={this.handleTouchCancel.bind(this)} 
					>
						{ player.showQueue ? <MoreVert /> : <MoreHoriz /> }
					</IconButton>
				</div>
			</Grid>
		);
	}
}

export default PlayerControls;
