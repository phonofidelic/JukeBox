import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

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
				<Button onClick={ () => { handleStartNewQueue(track, currentTrack) }} >
					play
				</Button>
				{
					queue.length ? 
					<Button onClick={ () => { handleAddToQueue(track) }}> 
						add to queue
					</Button>
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
			<Typography>
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
			</Typography>
		);
	}
}

export default TrackListItem;