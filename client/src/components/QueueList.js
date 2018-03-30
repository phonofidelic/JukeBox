import React, { Component } from 'react';

class QueuList extends Component {
	render() {
		const { queue, currentTrack } = this.props;
		console.log('[LOG]', currentTrack)
		const playingStyle = {
			background: 'red'
		};

		return (
			<ul className="QueueList">
				{
					queue.map(track => (
						<li 
							key={ track._id } 
							style={ currentTrack._id === track._id ? playingStyle : null }
						>
							{ track.name }
						</li>
					))
				}
			</ul>
		);
	}
}

export default QueuList;