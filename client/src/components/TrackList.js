import React, { Component } from 'react';
import TrackListItem from './TrackListItem';

class TrackList extends Component {
	render() {
		const { 
			tracks,
			selectedTrack,
			playing,
			currentTrack,
			handleSelectTrack,
			handleStartNewQueue,
			handleAddToQueue
		} = this.props;

		return (
			<ul>
				{tracks && tracks.map(track => (
					<TrackListItem 
						key={track._id} 
						track={track} 
						selectedTrack={selectedTrack}
						playing={playing}
						currentTrack={currentTrack}
						handleSelectTrack={handleSelectTrack}
						handleStartNewQueue={handleStartNewQueue}
						handleAddToQueue={handleAddToQueue}
					/>
				))}
			</ul>
		);
	}
}

export default TrackList;