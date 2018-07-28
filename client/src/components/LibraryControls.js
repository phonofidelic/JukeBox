import React, { Component } from 'react';
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

class LibraryControls extends Component {
	constructor(props) {
		super(props);
	}
	handleChange(e) {
		console.log('FilterControlls, e.target.value', e.target.value);
		this.props.setFilter(e.target.value);
		this.props.handleOrderBy(e.target.value);
	}
	render() {
		const { theme } = this.props;
		const styles = {
			root: {
				position: 'fixed',
				top: 0,
				zIndex: 1,
				background: theme.palette.primary.light,
				// borderBottom: `1px solid ${theme.palette.primary.dark}`
			}
		}
		return (
			<Grid container style={styles.root}>
				<Grid item>
					<Typography>Order by: </Typography>

				<Select
					value={this.props.orderBy} 
					onChange={this.handleChange.bind(this)}>
					<MenuItem value={FIELD_VALUES.TITLE}>Title</MenuItem>
					<MenuItem value={FIELD_VALUES.ARTIST}>Artist</MenuItem>
					<MenuItem value={FIELD_VALUES.ALBUM}>Album</MenuItem>
				</Select>	
				</Grid>
			</Grid>
		);
	}
}

export default withTheme()(LibraryControls);