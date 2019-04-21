import React, { Component } from 'react';

import { ThemeContext } from '../../contexts/theme.context';

import { withTheme } from '@material-ui/core/styles';

class PlayerProgress extends Component {
	static contextType = ThemeContext;

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
		this.props.handleSeek(segment, player.currentTrack);
	}

	getSegments() {
		const { player } = this.props;
		let segments = [];

		if (player.currentTrack) {
			for (let i=0; i < Math.round(player.currentTrack.format.duration); i++) {
				segments.push(i);
			}
		}
		return segments;
	}

	render() {
		const { player } = this.props;

		const theme = this.context;

		const styles = {
			root: {
				height: '10px',
				width: theme.dimensions.libraryDesktop.maxWidth,
				background: '#ccc',
			},
			progress: {
				background: theme.palette.secondary.main,
				height: '100%',
				width: player.currentTrack 
					? `${this.state.timeElapsed / (player.currentTrack.format.duration || player.currentTrack.howl.duration()) * 100}%`
					: 0,
			},
		}

		const segments = this.getSegments();

		// const windowWidth = window.innerWidth; // For full-width player
		let playerWidth = theme.dimensions.player.width; // For fixed width player
		const segWidth = Math.floor(playerWidth/segments.length);
	
		const segContainerStyle = {
			display: 'flex',
			position: 'absolute',
			height: `${theme.dimensions.playerProgress.height}px`,
			width: `${playerWidth}px`,
			bottom: `${theme.dimensions.player.height - 10}px`,
			cursor: 'pointer',
		}
		const segStyle = {
			// background: 'green', // ONLY FOR DEBUG
			// border: '1px solid #fff', // ONLY FOR DEBUG
			borderTop: 'none',
			borderBottom: 'none',
			height: '100%',
			width: `${segWidth}px`,
			flex: '1',
		}
		return (
			// <span>time: {this.state.timeElapsed / player.currentTrack.format.duration * 100 }</span>
			<div style={styles.root}>
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

export default withTheme()(PlayerProgress);
