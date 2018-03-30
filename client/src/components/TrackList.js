import React, { Component } from 'react';
import TrackListItem from './TrackListItem';

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
			<ul className="TrackList">
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
			</ul>
		);
	}
}

export default TrackList;