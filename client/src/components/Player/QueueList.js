import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';

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
				background: theme.palette.primary.main,
			}
		}

		return (
			<List style={{padding: '0'}}>
				{
					queue.map((track, i) => (
						<ListItem 
							key={ track.queueId }
							divider={ currentTrack.queueId !== track.queueId ? true : false }
							dense={true}
							style={ currentTrack.queueId === track.queueId ? styles.playing : null }
							onClick={() => this.handleQueueItemClick(i, track)}
						>
							<Grid container>
								<Grid item>
									<div><Typography noWrap>{ track.title }</Typography></div>
									{ 
										currentTrack.queueId === track.queueId ?
										<div>
											<div><Typography noWrap variant="caption">{ track.artist.name }</Typography></div>
											<div><Typography noWrap variant="caption">{ track.album.title }</Typography></div>
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
		);
	}
}

export default withTheme()(QueueList);