import React, { Component } from 'react';
import TrackListItemContainer from '../containers/TrackListItemContainer';
import DetailCard from './DetailCard';
import LibraryControls from './LibraryControls';
import {
	Typography, 
	List, 
	ListItem,
	Select,
	MenuItem,
	Grid,
	GridItem,
} from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';

const FIELD_VALUES = {
	TITLE: 'title',
	ARTIST: 'artist',
	ALBUM: 'album'
};

export class LibraryMobile extends Component {
	state = {
		orderBy: FIELD_VALUES.TITLE,
	}

	setFilter(filter) {
		this.setState({
			orderBy: filter
		});
	}

	render() {
		const { 
			library,
			artistList,
			handleOrderBy,
			handleCloseDetailView,
			theme,
		} = this.props;

		const styles = {
			root: {
				background: theme.palette.secondary.light,
				borderTop: `1px solid ${theme.palette.primary.main}`,
				padding: '0px',
				paddingTop: '45px',
				paddingBottom: '104px' // TODO: link value to Player + Nav height
			}
		};

		return (
			<div style={styles.root}>
				{
					library.detailViewData &&
					<DetailCard 
						detailViewData={library.detailViewData}
						handleCloseDetailView={handleCloseDetailView}
					/>
				}
				<LibraryControls 
					orderBy={this.state.orderBy} 
					setFilter={this.setFilter.bind(this)} 
					handleOrderBy={handleOrderBy}
				/>
				<List>
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
			</div>
		)
	}
}

export default withTheme()(LibraryMobile);
