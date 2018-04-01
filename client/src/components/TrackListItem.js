import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import { 
	PlayArrow,
	Queue
} from 'material-ui-icons';

const styles = theme => ({
  root: {
    // width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.primary.main
  },
});

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
			<Grid item>				
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
			</Grid>
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
				<Grid container justify={'flex-end'} alignItems={'center'}>
					<Grid item>
						<Typography>{ track.name }</Typography>
					</Grid>
				</Grid>
				<Grid container justify={'center'} alignItems={'center'}>
					{ selectedTrack && track._id === selectedTrack._id ? this.renderControlls() : null }
				</Grid>
			</ListItem>
			
		);
	}
}

export default TrackListItem;
