import React, { Component } from 'react';
import { withTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { ListItem } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import EditTrackForm from './EditTrackForm';
import TrackListItemControls from './TrackListItemControls';

class TrackListItem extends Component {
	state = {
		editMode: false
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
			handlePostTrackData,
			handleStartNewQueue,
			handleAddToQueue,
			handleDeleteTrack,
			handleToggleEditMode,
			theme
		} = this.props;

		const styles = {
			root: {
				borderBottom: `1px solid ${theme.palette.primary.main}`
			},
			selected: {
				background: theme.palette.primary.main,
				height: '50px',
				lineHeight: '50px'
			}
		};

		return (	
			<ListItem 
				onClick={() => handleSelectTrack(track)}
				style={
					selectedTrack && track._id === selectedTrack._id ? 
					styles.selected 
					: 
					styles.root
				}
			>
				{
					this.state.editMode ?
					<EditTrackForm
						track={track}
						handlePostTrackData={handlePostTrackData}
						handleToggleEditMode={this.handleToggleEditMode.bind(this)}
					/>
					:
					<Grid container alignItems={'center'}>
						<Grid item xs={8}><Typography>{ track.name }</Typography></Grid>
						{ 
							selectedTrack && track._id === selectedTrack._id ? 
							<TrackListItemControls 
								track={track}
								player={player}
								handleStartNewQueue={handleStartNewQueue}
								handleAddToQueue={handleAddToQueue}
								handleDeleteTrack={handleDeleteTrack}
								handleToggleEditMode={this.handleToggleEditMode.bind(this)}
							/>
							: 
							null 
						}
					</Grid>
				}
			</ListItem>
		);
	}
}

export default withTheme()((TrackListItem));
