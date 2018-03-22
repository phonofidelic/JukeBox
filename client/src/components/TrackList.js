import React, { Component } from 'react';
import TrackListItem from './TrackListItem';

class TrackList extends Component {
	render() {
		const { 
			tracks,
			selectedTrack,
			handleSelectTrack,
			handleStartNewQue,
			handleAddToQue
		} = this.props;

		return (
			<ul>
				{tracks && tracks.map(track => (
					<TrackListItem 
						key={track._id} 
						track={track} 
						selectedTrack={selectedTrack}
						handleSelectTrack={handleSelectTrack}
						handleStartNewQue={handleStartNewQue}
						handleAddToQue={handleAddToQue}
					/>
				))}
			</ul>
		);
	}
}

export default TrackList;