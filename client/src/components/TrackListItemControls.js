import React, { Component } from 'react';
// import AlertDialog from './AlertDialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { 
	PlayArrow,
	Queue,
	MoreVert
} from '@material-ui/icons';

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
		// console.log('# options click #\n', e.currentTarget)
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

	handleMenuOptionClickDetail(id, type) {
		this.setState({ ...this.state, anchorEl: null });
		this.props.handleOpenDetailView(id, type);
	}

	render() {
		const {
			track,
			player,
			handleStartNewQueue,
			handleAddToQueue,
			handleDeleteTrack,
			handleToggleEditMode,
			handleOpenDetailView,
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
					<MenuItem onClick={() => handleAddToQueue(track)}>Add to queue</MenuItem>
					<MenuItem onClick={() => this.handleMenuOptionClickDetail(track.artist._id, 'artist')}>View Artist Details</MenuItem>
					<MenuItem onClick={() => this.handleMenuOptionClickDetail(track.album._id, 'album')}>View Album Details</MenuItem>
					<MenuItem onClick={() => this.handleMenuOptionClickEdit()}>Edit info</MenuItem>
					<MenuItem onClick={() => this.handleMenuOptionClickDelete()}>
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
