import React, { Component } from 'react';
import LibraryContextMenu from './LibraryContextMenu';
import {
	TableRow,
	TableCell,
	TableBody,
	TableSortLabel,
	Typography,
	Tooltip,
} from '@material-ui/core';
import { Album } from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles';

class LibraryRow extends Component {
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
		this.setState({ ...this.state, editMode: !this.state.editMode });
	}

	handleMenuOptionClickDelete() {
		this.setState({ ...this.state, anchorEl: null });
		this.props.handleDeleteTrack(this.props.track);
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
			theme,
		} = this.props;

		const { anchorEl, editMode } = this.state;

		const styles = {
			titleCell: {
				maxWidth: theme.dimensions.libraryDesktop.titleCellWidth,
			},
			artistCell: {
				maxWidth: theme.dimensions.libraryDesktop.artistCellWidth,
			},
			albumCell: {
				maxWidth: theme.dimensions.libraryDesktop.albumCellWidth,
			},
			defaultImgContainer: {
				width: '32px', 
				height: '32px', 
				display: 'flex',
				background: theme.palette.primary.main,
			},
			defaultImg: {
				margin: 'auto',
				color: theme.palette.primary.light,
			},
			selected: {
				background: theme.palette.primary.main,
			},
		};

		console.log('editMode:', editMode);

		return (
			<TableRow 
				key={track._id} 
				hover
				onClick={() => handleSelectTrack(track)}
				onContextMenu={this.handleContextMenu.bind(this)}
				onDoubleClick={() => handleStartNewQueue(track, player.currentTrack)}
				style={
					selectedTrack && selectedTrack._id === track._id
					? styles.selected
					:
					null
				}
			>
				<TableCell>
				{
					track.image.src === 'defaultImage' ?
					<div style={styles.defaultImgContainer}><Album style={styles.defaultImg} /></div>
					:
					<img src={track.image.src} alt="Album art" width="32" height="32" />
				}
				</TableCell>
				<TableCell style={styles.titleCell}>
					<Tooltip 
						title={track.title} 
						placement="top-end"
						enterDelay={300}>
						<Typography noWrap>{track.title}</Typography>
					</Tooltip>
				</TableCell>
				<TableCell style={styles.artistCell}>
					<Typography noWrap>{track.artist}</Typography>
				</TableCell>
				<TableCell style={styles.albumCell}>
					<Typography noWrap>{track.album}</Typography>
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

export default withTheme()(LibraryRow);