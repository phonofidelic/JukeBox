import React, { Component } from 'react';
import Button from './Button';

class TrackListItem extends Component {
	renderControlls() {
		// TODO: onClick = addToQue (?)
		const { 
			track,
			currentTrack,
			queue,
			handleStartNewQueue,
			handleAddToQueue
		} = this.props;

		return (
			<span>
				<Button 
					handleClick={ () => { handleStartNewQueue(track, currentTrack) }} 
					text="play" 
				/>
				{
					queue.length ? 
					<Button 
						handleClick={ () => { handleAddToQueue(track) } } 
						text="add to queue" /> 
					: 
					null
				}
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
			background: '#ccc',
			height: '50px',
			lineHeight: '50px'
		};

		return (
			<li 
				className="TrackListItem"
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