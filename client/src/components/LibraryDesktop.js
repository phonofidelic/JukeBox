import React, { Component } from 'react';
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableSortLabel,
	Typography,
	Tooltip,
} from '@material-ui/core';
import { Album } from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles';
import { _ } from 'underscore';

const columnData = [
	{ id: 'title', numeric: false, disablePadding: true, label: 'Title' },
	{ id: 'artist', numeric: false, disablePadding: true, label: 'Artist' },
	{ id: 'album', numeric: false, disablePadding: true, label: 'Album' },
]

class LibraryDesktop extends Component {
  createSortHandler = columnId => e => {
    this.props.handleRequestSort(e, columnId);
  };

  // http://janetriley.net/2014/12/sort-on-multiple-keys-with-underscores-sortby.html
  sortByField(list, order, orderBy) {
  	return order === 'desc' 
  	? _.sortBy(_.sortBy(list, 'order.no'), orderBy)
  	: _.sortBy(_.sortBy(list, 'order.no'), orderBy).reverse();
  }

	render() {
		const {
			library,
			order,
			orderBy,
			theme,
		} = this.props;

		const styles = {
			root: {
				background: theme.palette.primary.light,
				// borderTop: `1px solid ${theme.palette.primary.main}`,
				// padding: '0px',
				// paddingTop: '45px',
				marginBottom: '104px' // TODO: link value to Player + Nav height
			},
			tableHead: {
				// position: 'fixed',
				// top: 0,
				// height: '50px',
				// width: '100%',
				// background: theme.palette.primary.light,
			},
			titleCell: {
				maxWidth: theme.dimensions.libraryDesktop.titleCellWidth,
			},
			artistCell: {
				maxWidth: theme.dimensions.libraryDesktop.artistCellWidth,
			},
			albumCell: {
				maxWidth: theme.dimensions.libraryDesktop.albumCellWidth,
			},
			defaultImgContainer: {
				width: '32px', 
				height: '32px', 
				display: 'flex',
				background: theme.palette.primary.main,
			},
			defaultImg: {
				margin: 'auto',
				color: theme.palette.primary.light,
			},
		}

		console.log(`LibraryDesktop, orderBy: ${orderBy}, ${order}`)
		return (
			<Table style={styles.root}>
				<TableHead style={styles.tableHead}>
					<TableRow>
						<TableCell></TableCell>
						{
							columnData.map(column => (
								<TableCell
									key={column.id}
									numeric={column.numeric}
	                padding={column.disablePadding ? 'none' : 'default'}
	                sortDirection={orderBy === column.id ? order : false}
	              >
	              	<TableSortLabel
	              		active={orderBy === column.id}
	              		direction={order}
	              		onClick={this.createSortHandler(column.id)}
	              	>
	              		{column.label}
	              	</TableSortLabel>
	              </TableCell>
							))
						}
					</TableRow>
				</TableHead>
				<TableBody>
					{library.tracks.length > 0 ? 
						this.sortByField(library.tracks, order, orderBy)
						.map(track => (
						<TableRow key={track._id} hover>
							<TableCell>
							{
								track.image.src === 'defaultImage' ?
								<div style={styles.defaultImgContainer}><Album style={styles.defaultImg} /></div>
								:
								<img src={track.image.src} alt="Album art" width="32" height="32" />
							}
							</TableCell>
							<TableCell style={styles.titleCell}>
								<Tooltip 
									title={track.title} 
									placement="top-end"
									enterDelay={300}>
									<Typography noWrap>{track.title}</Typography>
								</Tooltip>
							</TableCell>
							<TableCell style={styles.artistCell}>
								<Typography noWrap>{track.artist}</Typography>
							</TableCell>
							<TableCell style={styles.albumCell}>
								<Typography noWrap>{track.album}</Typography>
							</TableCell>
						</TableRow>
					))
					:
					(
						<TableRow>
							<TableCell>
								No tracks in Library
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		);
	}
}

export default withTheme()(LibraryDesktop);