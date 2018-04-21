import React, { Component } from 'react';
import { withTheme } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

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
			queue, 
			currentTrack, 
			theme 
		} = this.props;

		const styles = {
			playing: {
				background: theme.palette.secondary.main,
			}
		}

		return (
			<List style={{padding: '0'}}>
				{
					queue.map((track, i) => (
						<ListItem 
							key={ track.queueId }
							style={ currentTrack.queueId === track.queueId ? styles.playing : null }
							onClick={() => this.handleQueueItemClick(i, track)}
						>
							<Grid container>
								<Grid item>
									<Typography>
										{ track.name }
									</Typography>
								</Grid>
							</Grid>
						</ListItem>
					))
				}
			</List>
		);
	}
}

export default withTheme()(QueueList);
