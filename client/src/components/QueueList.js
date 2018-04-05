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

class QueuList extends Component {
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
			<List className={""} style={{padding: '0'}}>
				{
					queue.map((track, i) => (
						<ListItem 
							key={ track.queueId }
							style={ currentTrack.queueId === track.queueId ? styles.playing : null }
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

export default withTheme()(QueuList);