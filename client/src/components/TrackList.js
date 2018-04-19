import React, { Component } from 'react';
import TrackListItemContainer from '../containers/TrackListItemContainer';
import List from 'material-ui/List';
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
				padding: '0px'
			}
		}

		return (
			<List className="TrackList" style={styles.root}>
				{trackList.tracks && trackList.tracks.map(track => (
					<TrackListItemContainer 
						key={track._id} 
						track={track} 
					/>
				))}
			</List>
		);
	}
}

export default withTheme()(TrackList);