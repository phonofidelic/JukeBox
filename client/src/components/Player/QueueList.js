import React, { Component } from 'react';

import { ThemeContext } from '../../contexts/theme.context';

import styles from './QueueList.styles'
import {
	List,
	ListItem, 
	Grid, 
	Typography, 
	// Collapse,
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

// const styles = theme => ({
//   root: {
//     // width: '100%',
//     // maxWidth: 360,
//     backgroundColor: theme.palette.primary.main,
//     playing: theme.palette.secondary.main
//   },
// });

class QueueList extends Component {
	static contextType = ThemeContext;

	constructor(props) {
		super(props);
		this.handleQueueItemClick = this.handleQueueItemClick.bind(this)
	}

	handleQueueItemClick(newQueueIndex, track) {
		// console.log('handleQueueItemClick, track:', track)
		console.log('handleQueueItemClick, newQueueIndex:', newQueueIndex)
		// console.log('handleQueueItemClick, currentTrack:', currentTrack)
		
		this.props.handlePlayFromQueue(this.props.queue, this.props.queueIndex, newQueueIndex, track);
	}

	render() {
		const { 
			// showQueue,
			queue, 
			currentTrack, 
			classes,
		} = this.props;

		const theme = this.context;

		return (
			//<Collapse 
				//direction="up" 
				//in={showQueue} 
				//collapsedHeight="0px"
				//timeout="auto"
			//>
				<List className={classes.root} style={{height: window.innerHeight - theme.dimensions.player.height}}>
					{
						queue.map((track, i) => (
							<ListItem 
								className={ currentTrack.queueId === track.queueId ? classes.playing : null }
								key={ track.queueId }
								divider={ currentTrack.queueId !== track.queueId ? true : false }
								dense={true}
								onClick={() => this.handleQueueItemClick(i, track)}
							>
								<Grid container>
									<Grid item >
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
									</Grid>
								</Grid>
							</ListItem>
						))
					}
				</List>
			//</Collapse>
		);
	}
}

export default withStyles(styles)(QueueList);
