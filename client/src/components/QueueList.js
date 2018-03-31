import React, { Component } from 'react';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';

class QueuList extends Component {
	render() {
		const { queue, currentTrack } = this.props;
		console.log('[LOG]', currentTrack)
		const playingStyle = {
			background: 'red'
		};

		return (
			<List className="QueueList" style={{padding: '0'}}>
				{
					queue.map((track, i) => (
						<ListItem 
							key={ track.queueId }
							style={ currentTrack.queueId === track.queueId ? playingStyle : null }
						>
							<Typography>
								{ track.name }
							</Typography>
						</ListItem>
					))
				}
			</List>
		);
	}
}

export default QueuList;