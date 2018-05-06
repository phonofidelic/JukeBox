import React, { Component } from 'react';

class PlayerProgress extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timeElapsed: 0,
		}
	}

	componentDidMount() {
		window.addEventListener('howl_play', e => {
			console.log('howl_play event', e);
			const { player } = this.props;

			if (this.intervalID) clearInterval(this.intervalID);

			this.intervalID = setInterval(() => {
				this.setState({
					timeElapsed: player.currentTrack.howl.seek() || 0
				})
			}, 1)
		});

		window.addEventListener('howl_pause', e => {
			console.log('howl_pause event', e);
			clearInterval(this.intervalID);
		});

		window.addEventListener('howl_end', e => {
			console.log('howl_end event', e);
			clearInterval(this.intervalID);
		});
	}

	render() {
		const { player } = this.props;
		const styles = {
			progressContainer: {
				height: '10px',
				width: '100%',
				background: '#ccc'
			},
			progress: {
				background: 'green',
				height: '100%',
				width: `${this.state.timeElapsed / player.currentTrack.format.duration * 100}%`,
			}
		}
		return (
			// <span>time: {this.state.timeElapsed / player.currentTrack.format.duration * 100 }</span>
			<div style={styles.progressContainer}>
				<div style={styles.progress}></div>
			</div>
		);
	}
}

export default PlayerProgress;
