import React, { Component } from 'react';

class TrackListItem extends Component {
	renderPlayButton() {
		// TODO: onClick = addToQue (?)
		const { 
			track,
			selectedTrack, 
			handleStartNewQue,
			handleAddToQue
		} = this.props;

		return (
			<span>
				<button onClick={ () => { handleStartNewQue(track) } }>start new que</button>
				<button onClick={ () => { handleAddToQue(track) } }>add to que</button>
			</span>
		);
	}

	render() {
		const { 
			track,
			handleSelectTrack,
			selectedTrack
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
			{ selectedTrack && track._id === selectedTrack._id ? this.renderPlayButton() : null }
			</li>
		);
	}
}

export default TrackListItem;