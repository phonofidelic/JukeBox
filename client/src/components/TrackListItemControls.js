import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import { 
	PlayArrow,
	Queue,
	MoreVert
} from 'material-ui-icons';
import Menu, { MenuItem } from 'material-ui/Menu';
import AlertDialog from './AlertDialog';

const deleteTrackAlert = {
	headerText: 'Are you sure you want to delete this track?',
	bodyText: 'Confirming will permanently delete the selected track. This action cannot be undone.',
	cancleButtonText: 'Cancel',
	confirmButtonText: 'Confirm'
}

class TrackListItemControls extends Component {
	state = {
		anchorEl: null,
		alertOpen: false
	}

	handleOptionsClick(e) {
		this.setState({ ...this.state, anchorEl: e.currentTarget });
	}

	handleOptionsClose(e) {
		this.setState({ ...this.state, anchorEl: null });
	}

	handleMenuOptionClickEdit() {
		this.props.handleToggleEditMode();
	}

	handleMenuOptionClickDelete() {
		this.setState({ ...this.state, anchorEl: null });
		this.props.handleDeleteTrack(this.props.track);
	}

	render() {
		const {
			track,
			player,
			handleStartNewQueue,
			handleAddToQueue,
			handleDeleteTrack,
			handleToggleEditMode,
		} = this.props;

		const { anchorEl } = this.state;

		const styles = {
			menue: {
				padding: '0px'
			}
		}

		return (
			<Grid item xs={4}>				
				<IconButton title="Start new queue" onClick={ () => { handleStartNewQueue(track, player.currentTrack) }} >
				<PlayArrow />
				</IconButton>
				{
					player.queue.length ? 
					<IconButton title="Add to queue" onClick={ () => { handleAddToQueue(track) }}> 
						<Queue />
					</IconButton>
					: 
					null
				}
				<IconButton 
					title="Options"
					aria-owns={anchorEl ? 'options-menu' : null}
					aria-haspopup="true"
					onClick={this.handleOptionsClick.bind(this)}
					>
					<MoreVert />
				</IconButton>
				<Menu
					id="options-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleOptionsClose.bind(this)}
					style={styles.menu}
				>
					<MenuItem onClick={() => this.handleMenuOptionClickEdit()}>Edit Track</MenuItem>
					<MenuItem onClick={() => this.handleMenuOptionClickDelete()}>
						Delete
						{/*<AlertDialog 
							onAlertClose={this.handleOptionsClose.bind(this)}
							triggerButtonText="Delete"
							headerText="Are you sure you want to delete this track?" 
							bodyText={'Confirming will permanently delete the selected track. This action cannot be undone.'} 
							actionCancelButtonText="Cancel"
							actionConfirmButtonText="Confirm"
							handleActionConfirm={() => handleDeleteTrack(track)}
						/>*/}
					</MenuItem>
				</Menu>
			</Grid>
		);
	}
}

export default TrackListItemControls;
