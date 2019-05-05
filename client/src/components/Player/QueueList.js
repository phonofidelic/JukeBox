import React, { Component } from 'react';

import { ThemeContext } from '../../contexts/theme.context';

import styles from './QueueList.styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

class QueueList extends Component {
	static contextType = ThemeContext;

	constructor(props) {
		super(props);
		this.handleQueueItemClick = this.handleQueueItemClick.bind(this)
	}

	handleQueueItemClick(newQueueIndex, track) {
		this.props.handlePlayFromQueue(this.props.queue, this.props.queueIndex, newQueueIndex, track);
	}

	render() {
		const { 
			queue, 
			currentTrack,
			classes,
		} = this.props;

		return (
			<List 
				className={classes.root} 
			>
				{
					queue.map((track, i) => (
						<ListItem 
							className={ currentTrack.queueId === track.queueId ? classes.playing : null }
							key={ track.queueId }
							divider={ currentTrack.queueId !== track.queueId ? true : false }
							dense={true}
							onClick={() => this.handleQueueItemClick(i, track)}
						>
							<div>
								<Typography noWrap>{i+1}. { track.title }</Typography>
								{ 
									currentTrack.queueId === track.queueId ?
									<div>
										<Typography noWrap variant="caption">{ track.artist.name }</Typography>
										<Typography noWrap variant="caption">{ track.album.title }</Typography>
									</div>
									:
									null
								}
							</div>
						</ListItem>
					))
				}
			</List>
		);
	}
}

export default withStyles(styles)(QueueList);
