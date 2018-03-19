import React, { Component } from 'react';

class TrackList extends Component {
	render() {
		const { tracks, handleSelectTrack, selectedTrack } = this.props;

		const selected = {
			background: '#ccc'
		}
		return (
			<ul>
				{tracks ? tracks.map((track, i) => (
					<li 
						key={i} 
						onClick={() => handleSelectTrack(track)}
						style={
							selectedTrack && track._id === selectedTrack._id ? 
							selected 
							: 
							{}
						}
					>
						{track.name}
					</li>
				)) : null}
			</ul>
		)
	}
}

export default TrackList;