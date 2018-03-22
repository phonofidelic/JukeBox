import React, { Component } from 'react';
import ReactHowler from 'react-howler';

class Player extends Component {
	getHowler() {
		this.player.howler
	}

	componentDidMount() {
		console.log('player:', this)
	}

	renderControlls() {
		const {
			playing, 
			handleStopTrack,
			handlePlayTrack,
			handlePauseTrack
		} = this.props;

		return (
			<div>
				{!playing ? <button onClick={ handlePlayTrack }>play</button> : <button onClick={ handlePauseTrack }>pause</button>}
				<button onClick={ handleStopTrack }>stop</button>
			</div>
		);
	}

	render() {
		const { que, playing, tracks, selectedTrack } = this.props;
		return (
			<div>
				{que.length > 0 && (
					<div>
						Player
						{this.renderControlls()}
						<ReactHowler 
							src={ que }
							playing={ playing }
							html5={ true }
							ref={(ref) => (this.player = ref)}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default Player;