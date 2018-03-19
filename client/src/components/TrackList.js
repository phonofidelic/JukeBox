import React, { Component } from 'react';

class TrackList extends Component {
	render() {
		const { tracks } = this.props;
		return (
			<ul>
				{tracks ? tracks.map((track, i) => (
					<li key={i}>{track.name}</li>
				)) : null}
			</ul>
		)
	}
}

export default TrackList;