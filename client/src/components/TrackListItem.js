import React, { Component } from 'react';

class TrackListItem extends Component {
	renderControlls() {
		// TODO: onClick = addToQue (?)
		const { 
			track,
			selectedTrack,
			playing,
			currentTrack,
			handleStartNewQueue,
			handleAddToQueue
		} = this.props;

		return (
			<span>
				<button onClick={ () => { handleStartNewQueue(track, currentTrack) } }>start new queue</button>
				<button onClick={ () => { handleAddToQueue(track) } }>add to queue</button>
			</span>
		);
	}

	render() {
		const { 
			track,
			handleSelectTrack,
			selectedTrack,
			playing
		} = this.props;

		const selected = {
			background: '#ccc'
		};

		return (
			<li 
				onClick={() => handleSelectTrack(track)}
				style={
					selectedTrack && track._id === selectedTrack._id ? 
					selected 
					: 
					{}
				}
			>
			{ track.name }
			{ selectedTrack && track._id === selectedTrack._id ? this.renderControlls() : null }
			</li>
		);
	}
}

export default TrackListItem;