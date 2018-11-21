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
				height: 52,
				top: 0,
				zIndex: 1,
				background: theme.palette.secondary.light,
				// borderBottom: `1px solid ${theme.palette.primary.dark}`
			},
			orderByLabel: {
				height: 52,
				lineHeight: '52px',
				verticalAlign: 'middle',
				paddingLeft: 10,
			}
		}
		return (
			<Grid container style={styles.root}>
				<Grid item>
					<Typography style={styles.orderByLabel}>Order by: </Typography>
				</Grid>
				<Grid item>
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