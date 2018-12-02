import React, { Component } from 'react';
// import AlertDialog from './AlertDialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { 
	PlayArrow,
	// Queue,
	MoreVert
} from '@material-ui/icons';

const menuOptions = {
	DELETE_TRACK: 'delete_track',
	EDIT_INFO: 'edit_info',
	SHOW_DETAIL: 'show_detail',
	CLOSE: 'close',
	START_NEW_QUEUE: 'start_new_queue',
	ADD_TO_QUEUE: 'add_to_queue',

}

// const deleteTrackAlert = {
// 	headerText: 'Are you sure you want to delete this track?',
// 	bodyText: 'Confirming will permanently delete the selected track. This action cannot be undone.',
// 	cancleButtonText: 'Cancel',
// 	confirmButtonText: 'Confirm'
// }

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

	handleMenuOptionClick(option, data) {
		const { 
			handleStartNewQueue,
			handleAddToQueue,
			handleToggleEditMode,
			handleOpenDetailView,
			handleDeleteTrack,
		} = this.props;

		switch (option) {
			case menuOptions.START_NEW_QUEUE: 
				handleStartNewQueue(data.track, data.currentTrack);
				this.setState({ ...this.state, anchorEl: null });
				break;

			case menuOptions.ADD_TO_QUEUE:
				handleAddToQueue(data.track);
				this.setState({ ...this.state, anchorEl: null });
				break;

			case menuOptions.EDIT_INFO:
				handleToggleEditMode();
				this.setState({ ...this.state, anchorEl: null });
				break;

			case menuOptions.SHOW_DETAIL:
				handleOpenDetailView(data.id, data.type);
				this.setState({ ...this.state, anchorEl: null });
				break;

			case menuOptions.DELETE_TRACK:
				handleDeleteTrack(data.track);
				this.setState({ ...this.state, anchorEl: null });
				break;

			default: return this.setState({ ...this.state, anchorEl: null });
		}
	}

	render() {
		const {
			track,
			player,
			handleStartNewQueue,
			// handleDeleteTrack,
		} = this.props;

		const { anchorEl } = this.state;

		const styles = {
			menue: {
				padding: '0px'
			}
		}

		return (
			<Grid container justify="flex-end">
				<IconButton title="Start new queue" onClick={ () => { handleStartNewQueue(track, player.currentTrack) }} >
				<PlayArrow />
				</IconButton>
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
					{ 
						player.queue.length > 0 ?
						<MenuItem onClick={() => this.handleMenuOptionClick(menuOptions.ADD_TO_QUEUE, { track: track })}>Add to queue</MenuItem>
						:
						<MenuItem onClick={() => this.handleMenuOptionClick(menuOptions.START_NEW_QUEUE, { track: track, currentTrack: player.currentTrack })}>Play track</MenuItem>
					}
					<MenuItem onClick={() => this.handleMenuOptionClick(menuOptions.SHOW_DETAIL, { id: track.artist._id, type: 'artist' })}>View Artist Details</MenuItem>
					<MenuItem onClick={() => this.handleMenuOptionClick(menuOptions.SHOW_DETAIL, { id: track.album._id, type: 'album' })}>View Album Details</MenuItem>
					{/*<MenuItem onClick={() => this.handleMenuOptionClick(menuOptions.EDIT_INFO)}>Edit info</MenuItem>*/}
					<MenuItem onClick={() => this.handleMenuOptionClick(menuOptions.DELETE_TRACK, { track: track })}>
						Delete track
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
