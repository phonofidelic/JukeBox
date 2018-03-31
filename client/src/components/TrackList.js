import React, { Component } from 'react';
import TrackListItem from './TrackListItem';
import List from 'material-ui/List';

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
			handleAddToQueue
		} = this.props;

		return (
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
					/>
				))}
			</List>
		);
	}
}

export default TrackList;