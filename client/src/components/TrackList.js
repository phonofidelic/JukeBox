import React, { Component } from 'react';
import TrackListItemContainer from '../containers/TrackListItemContainer';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withTheme } from 'material-ui/styles';

export class TrackList extends Component {
	render() {
		const { 
			trackList,
			theme
		} = this.props;

		const styles = {
			root: {
				background: theme.palette.primary.light,
				borderTop: `1px solid ${theme.palette.primary.main}`,
				padding: '0px',
				paddingTop: '45px',
				paddingBottom: '104px' // TODO: link value to Player + Nav height
			}
		}

		return (
			<List className="TrackList" style={styles.root}>
			{
				trackList.tracks.length ? trackList.tracks.map(track => (
					<TrackListItemContainer 
						key={track._id} 
						track={track} 
					/>
				))
				:
				(<Typography>No tracks in Library</Typography>)
			}
			</List>
		);
	}
}

export default withTheme()(TrackList);