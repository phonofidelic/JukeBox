import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LibraryContextMenu from './LibraryContextMenu';
import playingThumb from './playing_thumb.svg';
import {
	TableRow,
	TableCell,
	TableBody,
	TableSortLabel,
	Typography,
	Tooltip,
} from '@material-ui/core';
import { 
	Album,
	PlayCircleOutline,
} from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles';
import * as moment from 'moment';
import 'moment-duration-format';

export class LibraryRow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editMode: false,
			anchorEl: null,
		}
	}

	handleContextMenu(e) {
		e.preventDefault();
		console.log('# options click #\n', e.currentTarget)
		this.setState({ ...this.state, anchorEl: e.currentTarget });
	}

	handleContextMenuClose() {
		this.setState({ ...this.state, anchorEl: null });
	}

	handleToggleEditMode() {
		console.log('handleToggleEditMode, state:', this.state)
		this.setState({ ...this.state, editMode: !this.state.editMode });
	}

	handleMenuOptionClickDelete() {
		this.setState({ ...this.state, anchorEl: null });
		this.props.handleDeleteTrack(this.props.track);
	}

	renderTrackThumb() {
		const {
			track, 
			player,
			theme,
		} = this.props;

		const styles = {
			playing: {
				zIndex: 2,
				position: 'absolute',
				backgroundColor: 'rgba(0, 0, 0, .5)',
			}
		}

		return (
			<div>
			{
				(player.playing && player.currentTrack._id === track._id) && 
				<img src={playingThumb} style={styles.playing} alt="Playing..." width="32" height="32" />
			}
			<img src={track.image.src} alt="Album art" width="32" height="32" />
			</div>
		)
	}

	render() {
		const { 
			track,
			player,
			selectedTrack,
			handleSelectTrack,
			handleEditTrackData,
			handleStartNewQueue,
			handleAddToQueue,
			handleOpenDetailView,
			theme,
		} = this.props;

		const { anchorEl, editMode } = this.state;

		const styles = {
			root: {
				cursor: 'pointer',
			},
			imageCell: {
				paddingRight: 10,
				maxWidth: '32px',
				textAlign: 'right'
			},
			titleCell: {
				paddingLeft: 0,
				paddingRight: 20,
				maxWidth: '200px',
			},
			durationCell: {
				paddingLeft: 20,
				paddingRight: 20,
				maxWidth: '50px',
			},
			artistCell: {
				paddingRight: 20,
				maxWidth: '200px',
			},
			albumCell: {
				paddingLeft: 20,
				maxWidth: '200px',
			},
			selected: {
				background: theme.palette.secondary.light,
			},
		};

		const duration = track.format ? track.format.duration : 0;
		const minutes = Math.floor(duration/60);
		const rawSeconds = Math.floor(duration) - minutes * 60;

		const seconds = rawSeconds <= 9
			? rawSeconds + '0'
			: rawSeconds;

		// console.log('editMode:', editMode);
		var dateTest = new Date();
		// console.log('moment.duration:', moment.duration(track.format.duration, 'seconds'));
		const mDuration = moment.duration(Math.floor(track.format.duration), 'seconds').format('mm:ss', { forceLength: false });
		// console.log('mDuration:', mDuration)

		return (
			<TableRow 
				key={track._id} 
				hover
				onClick={() => handleSelectTrack(track)}
				onContextMenu={this.handleContextMenu.bind(this)}
				onDoubleClick={() => handleStartNewQueue(track, player.currentTrack)}
				style={
					selectedTrack && selectedTrack._id === track._id
					? {...styles.root, ...styles.selected}
					:
					{...styles.root}
				}
			>
				<TableCell style={styles.imageCell}>
					{ this.renderTrackThumb() }
				</TableCell>
				<TableCell style={styles.titleCell}>
					<Tooltip 
						title={track.title} 
						placement="top-start"
						enterDelay={300}
					>
						<Typography noWrap>{track.title}</Typography>
					</Tooltip>
				
				</TableCell>
				<TableCell style={styles.durationCell}>
					<Typography noWrap>{mDuration}</Typography>
				</TableCell>
				<TableCell style={styles.artistCell}>
					<Tooltip 
						title={track.artist.name} 
						placement="top-start"
						enterDelay={300}
					>
						<Typography 
							noWrap
							onClick={() => handleOpenDetailView(track.artist._id, 'artist')}
						>
							{track.artist.name}
						</Typography>
					</Tooltip>
				</TableCell>
				<TableCell style={styles.albumCell}>
					<Tooltip 
						title={track.album.title} 
						placement="top-start"
						enterDelay={300}
					>
						<Typography 
							noWrap
							onClick={() => handleOpenDetailView(track.album._id, 'album')}
						>
							{track.album.title}
						</Typography>
					</Tooltip>
				</TableCell>
				<LibraryContextMenu 
					track={track}
					anchorEl={anchorEl}
					handleContextMenuClose={this.handleContextMenuClose.bind(this)}
					handleToggleEditMode={this.handleToggleEditMode.bind(this)}
					handleMenuOptionClickDelete={this.handleMenuOptionClickDelete.bind(this)}
					handleAddToQueue={handleAddToQueue}
				/>
			</TableRow>
		);
	}
}

LibraryRow.propTypes = {
	track: PropTypes.object.isRequired,
	player: PropTypes.object.isRequired,
	selectedTrack: PropTypes.object,
	handleSelectTrack: PropTypes.func.isRequired,
	handleEditTrackData: PropTypes.func.isRequired,
	handleStartNewQueue: PropTypes.func.isRequired,
	handleAddToQueue: PropTypes.func.isRequired,
	handleOpenDetailView: PropTypes.func.isRequired,
}

export default withTheme()(LibraryRow);
