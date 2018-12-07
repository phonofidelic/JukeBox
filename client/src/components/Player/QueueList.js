import React, { Component } from 'react';
import styles from './QueueList.styles'
import {
	List,
	ListItem, 
	Grid, 
	Typography, 
	Collapse,
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
			showQueue,
			queue, 
			currentTrack, 
			classes,
		} = this.props;

		return (
			<Collapse direction="up" in={showQueue} collapsedHeight="0px">
				<List className={classes.root}>
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
									<Grid item style={{width: '100%'}}>
										<Typography noWrap>{ track.title }</Typography>
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
			</Collapse>
		);
	}
}

export default withStyles(styles)(QueueList);
