import React, { Component } from 'react';
import EditTrackForm from './EditTrackForm';
import TrackListItemControls from './TrackListItemControls';
import playingThumb from './playing_thumb.svg';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { 
	Album
} from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles';


class TrackListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editMode: false
		}
	}

	handleToggleEditMode() {
		this.setState({
			...this.state,
			editMode: !this.state.editMode
		});
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
			handleDeleteTrack,
			handleToggleEditMode,
			handleOpenDetailView,
			theme
		} = this.props;

		const { editMode } = this.state;

		const isSelected = selectedTrack && track._id === selectedTrack._id;

		const styles = {
			root: {
				// borderBottom: `1px solid ${theme.palette.primary.main}`,
				// padding: '10px'
				// borderLeft: `solid ${theme.palette.primary.light} 5px`,
			},
			selected: {
				background: theme.palette.primary.selected,
				// // height: '50px',
				// lineHeight: '50px',
				// verticalAlign: 'middle,'
			},
			defaultImgContainer: {
				width: '50px', 
				height: '50px', 
				display: 'flex',
				background: theme.palette.primary.main,
			},
			defaultImg: {
				margin: 'auto',
				color: theme.palette.primary.light,
			},
			playing: {
				// borderLeft: `solid ${theme.palette.secondary.main} 5px`,
				// background: theme.palette.secondary.main,
				// backgroundSize: '50px'
				zIndex: 2,
				position: 'absolute',
				backgroundColor: 'rgba(0, 0, 0, .5)',
			},
		};
	
		return (
            <ListItem 
				onClick={() => handleSelectTrack(track)}
				divider
				style={
					isSelected ? 
					styles.selected
					:
					styles.root	
				}
				dense={true}
			>
				{
					editMode ?
					<Grid container alignItems="center">
						<EditTrackForm
							track={track}
							handleEditTrackData={handleEditTrackData}
							handleToggleEditMode={this.handleToggleEditMode.bind(this)}
						/>
					</Grid>
					:
					<Grid 
						container 
						alignItems="center"
						
						>
						<Grid item xs={2}>
							<div>
							{
								(player.playing && player.currentTrack._id === track._id) && 
								<img src={playingThumb} style={styles.playing} alt="Playing..." width="50" height="50" />
							}
							<img src={track.image.src} alt="Album art" width="50" height="50" />
							</div>
						</Grid>
						<Grid item xs={6}>
							<Grid container direction="column">
								<div><Typography noWrap>{ track.title }</Typography></div>
								<div><Typography noWrap variant="caption">{ track.artist.name }</Typography></div>
								<div><Typography noWrap variant="caption">{ track.album.title }</Typography></div>
								{/* isSelected && <div><Typography noWrap variant="caption">{ track.format.duration || 'no durration' }</Typography></div> */}
							</Grid>
						</Grid>
						{ 
							selectedTrack && track._id === selectedTrack._id ? 
							<Grid item xs={4}>
									<TrackListItemControls 
										track={track}
										player={player}
										handleStartNewQueue={handleStartNewQueue}
										handleAddToQueue={handleAddToQueue}
										handleDeleteTrack={handleDeleteTrack}
										handleToggleEditMode={this.handleToggleEditMode.bind(this)}
										handleOpenDetailView={handleOpenDetailView}
									/>
							</Grid>
							: 
							null
						}
					</Grid>
				}
			</ListItem>
        );
	}
}

export default withTheme()(TrackListItem);
