import React, { Component } from 'react';
import TrackListItemContainer from '../containers/TrackListItemContainer';
import {
	Typography, 
	List, 
	ListItem,
} from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';

// class FilterControlls extends Component {
// 	render() {

// 	}
// }

export class Library extends Component {

	render() {
		const { 
			library,
			theme,
		} = this.props;

		const styles = {
			root: {
				background: theme.palette.primary.light,
				borderTop: `1px solid ${theme.palette.primary.main}`,
				padding: '0px',
				paddingTop: '45px',
				paddingBottom: '104px' // TODO: link value to Player + Nav height
			}
		};

		return (
			<List className="TrackList" style={styles.root}>
			{
				library.tracks.length > 0 ? library.tracks.map(track => (
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

export default withTheme()(Library);
