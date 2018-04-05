import React, { Component } from 'react';
import TrackListItem from './TrackListItem';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withTheme } from 'material-ui/styles';

export class TrackList extends Component {
	render() {
		const { 
			tracks,
			selectedTrack,
			playing,
			queue,
			currentTrack,
			handleSelectTrack,
			handleStartNewQueue,
			handleAddToQueue,
			handlePostTrackData,
			handleDeleteTrack,
			theme
		} = this.props;

		const styles = {
			root: {
				background: theme.palette.primary.light
			}
		}

		return (
			<div style={styles.root}>
				<Typography variant="display1">Track List</Typography>
				<List className="TrackList">
					{tracks && tracks.map(track => (
						<TrackListItem 
							key={track._id} 
							track={track} 
							selectedTrack={selectedTrack}
							queue={queue}
							playing={playing}
							currentTrack={currentTrack}
							handleSelectTrack={handleSelectTrack}
							handleStartNewQueue={handleStartNewQueue}
							handleAddToQueue={handleAddToQueue}
							handlePostTrackData={handlePostTrackData}
							handleDeleteTrack={handleDeleteTrack}
						/>
					))}
				</List>
			</div>
		);
	}
}

export default withTheme()(TrackList);