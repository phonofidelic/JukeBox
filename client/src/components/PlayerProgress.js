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
			// console.log('howl_play event', e);
			const { player } = this.props;

			if (this.intervalID) clearInterval(this.intervalID);

			this.intervalID = setInterval(() => {
				this.setState({
					timeElapsed: player.currentTrack.howl.seek() || 0
				})
			}, 1)
		});

		window.addEventListener('howl_pause', e => {
			// console.log('howl_pause event', e);
			clearInterval(this.intervalID);
		});

		window.addEventListener('howl_end', e => {
			// console.log('howl_end event', e);
			clearInterval(this.intervalID);
		});
	}

	handlePosClick(segment) {
		const { player } = this.props;

		console.log('pos:', segment.pos)
		this.props.handleSeek(segment.pos, player.currentTrack);
	}

	render() {
		const { player } = this.props;
		const styles = {
			progressContainer: {
				height: '10px',
				width: '100%',
				background: '#ccc',
			},
			progress: {
				background: 'green',
				height: '100%',
				width: `${this.state.timeElapsed / (player.currentTrack.format.duration || player.currentTrack.howl.duration()) * 100}%`,
			},
			segment: {
				background: 'green'
			}
		}

		// console.log('## duration:', Math.round(player.currentTrack.format.duration))
		let segments = [];
		for (let i=0; i < Math.round(player.currentTrack.format.duration); i++) {
			segments.push({pos: i});
		}
		const ww = window.innerWidth;
		const segWidth = Math.floor(ww/segments.length);
	
		// console.log('segments', segments, 'segWidth', segWidth)

		const segContainerStyle = {
			display: 'flex',
			position: 'absolute',
			height: '10px',
			width: '100%',
			top: '0',
		}
		const segStyle = {
			// background: 'green',
			// border: '1px solid #fff', // TODO: Remove all borders, their just there for development
			borderTop: 'none',
			borderBottom: 'none',
			height: '100%',
			width: `${segWidth}px`,
			flex: '1',
		}
		return (
			// <span>time: {this.state.timeElapsed / player.currentTrack.format.duration * 100 }</span>
			<div style={styles.progressContainer}>
				<div style={styles.progress}></div>
				<div style={segContainerStyle}>
				{
					segments.map((segment, i) => {
						return (
							<span 
								key={i} 
								style={segStyle} 
								onClick={() => this.handlePosClick(segment)}
								onTouchEnd={() => this.handlePosClick(segment)}
							/>
						)
					})
				}
				</div>
			</div>
		);
	}
}

export default PlayerProgress;
