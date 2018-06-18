import React, { Component } from 'react';
import TrackListItemContainer from '../containers/TrackListItemContainer';
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

// class LibraryControls extends Component {
// 	constructor(props) {
// 		super(props);
// 	}
// 	handleChange(e) {
// 		console.log('FilterControlls, e.target.value', e.target.value);
// 		this.props.setFilter(e.target.value);
// 		this.props.handleOrderBy(e.target.value);
// 	}
// 	render() {
// 		const styles = {
// 			root: {
// 				position: 'fixed',
// 				top: 0,
// 				// zIndex: 2000,
// 				background: '#fff',
// 			}
// 		}
// 		return (
// 			<Grid container style={styles.root}>
// 				<Grid item>
// 					<Typography>Order by: </Typography>

// 				<Select value={this.props.orderBy} onChange={this.handleChange.bind(this)}>
// 					<MenuItem value={FIELD_VALUES.TITLE}>Title</MenuItem>
// 					<MenuItem value={FIELD_VALUES.ARTIST}>Artist</MenuItem>
// 					<MenuItem value={FIELD_VALUES.ALBUM}>Album</MenuItem>
// 				</Select>	
// 				</Grid>
// 			</Grid>
// 		);
// 	}
// }

export class Library extends Component {
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
			<div style={styles.root}>
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
		);
	}
}

export default withTheme()(Library);
