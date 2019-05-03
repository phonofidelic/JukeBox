import React, { Component } from 'react';

import { 
	ThemeContext, 
	getSecondaryBackgroundColor,
} from '../../contexts/theme.context';

import { Slider } from 'material-ui-slider';

class PlayerProgress extends Component {
	static contextType = ThemeContext;

	constructor(props) {
		super(props);
		this.state = {
			timeElapsed: 0,
			sliderValue: 0,
			isMobile: navigator.userAgent.indexOf('Mobile') > 0 ? true : false,
		}
	}

	componentDidMount() {
		window.addEventListener('howl_play', e => {
			// console.log('howl_play event', e);
			this.startTimer();
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

	startTimer() {
		const { player } = this.props;
		if (this.intervalID) clearInterval(this.intervalID);

		this.intervalID = setInterval(() => {
			this.setState({
				timeElapsed: player.currentTrack.howl.seek() || 0,
			})
		}, 1000);
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

	handleChange(value) {
		// console.log('PlayerProgress - handleChange, value:', value)
		clearInterval(this.intervalID)
	}

	handleChangeComplete(value) {
		const { 
			player, 
			handleSeek,
		} = this.props;

		// Convert 'value' (percentage) to time position
		const pos = player.currentTrack.format.duration * (value / 100);
		handleSeek(pos, player.currentTrack);

		this.startTimer();
	}

	componentWillUnmount() {
		clearInterval(this.intervalID)
	}

	render() {
		const { 
			player, 
			playerIsOpen,
		} = this.props;

		const { 
			isMobile,
			timeElapsed,
		} = this.state;

		const theme = this.context;

		const styles = {
			root: {
				height: playerIsOpen ? 'inherit' : '4px',
				width: isMobile ? '100%' : theme.dimensions.libraryDesktop.maxWidth,
				background: playerIsOpen ? getSecondaryBackgroundColor({theme}) : 'none',
			},
			progress: {
				background: theme.palette.secondary.main,
				height: '100%',
				width: player.currentTrack 
					? `${timeElapsed / (player.currentTrack.format.duration || player.currentTrack.howl.duration()) * 100}%`
					: 0,
			},
		}

		return (
			<div style={styles.root}>
				{ playerIsOpen ?
					<Slider
						style={{backgroundColor: getSecondaryBackgroundColor({theme})}}
						value={timeElapsed / (player.currentTrack.format.duration || player.currentTrack.howl.duration()) * 100}
						onChange={this.handleChange.bind(this)}
						onChangeComplete={this.handleChangeComplete.bind(this)}
						color="#e62118"
					/>
					:
					<div style={styles.progress}></div>
				}
			</div>
		);
	}
}

export default PlayerProgress;
