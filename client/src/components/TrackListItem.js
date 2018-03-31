import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import { 
	PlayArrow,
	Queue
} from 'material-ui-icons';

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
				<IconButton onClick={ () => { handleStartNewQueue(track, currentTrack) }} >
				<PlayArrow />
				</IconButton>
				{
					queue.length ? 
					<IconButton label="Add to queue" onClick={ () => { handleAddToQueue(track) }}> 
						<Queue />
					</IconButton>
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
			
			<ListItem 
				className="TrackListItem"
				onClick={() => handleSelectTrack(track)}
				style={
					selectedTrack && track._id === selectedTrack._id ? 
					selected 
					: 
					{}
				}
			>
			<Typography>{ track.name }</Typography>
			{ selectedTrack && track._id === selectedTrack._id ? this.renderControlls() : null }
			</ListItem>
			
		);
	}
}

export default TrackListItem;