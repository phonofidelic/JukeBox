import React, { Component } from 'react';
import LibraryRowContainer from '../containers/LibraryRowContainer';
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
import { Album, Schedule } from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles';
import { _ } from 'underscore';
import LibraryContextMenu from './LibraryContextMenu';
import DetailCard from './DetailCard';


const columnData = [
	// { id: 'empty', numeric: false, disablePadding: true, label: ''},
	{ id: 'title', numeric: false, disablePadding: false, label: 'Title', labelText: 'Title' },
	{ id: 'duration', numeric: false, disablePadding: false, label: <Schedule />, labelText: 'Duration' },
	{ id: 'artist', numeric: false, disablePadding: false, label: 'Artist', labelText: 'Artist' },
	{ id: 'album', numeric: false, disablePadding: false, label: 'Album', labelText: 'Album' },
]

class LibraryDesktop extends Component {
  createSortHandler = columnId => e => {
    this.props.handleRequestSort(e, columnId);
  };

  /*
   * http://janetriley.net/2014/12/sort-on-multiple-keys-with-underscores-sortby.html
   * https://lodash.com/docs/#sortBy
   */
  sortByField(list, order, orderBy) {
  	if (orderBy === 'duration') {
  		return order === 'desc' 
  		? _.sortBy(list, ['format', 'duration'])
  		: _.sortBy(list, ['format', 'duration']).reverse();
  	}

  	if (orderBy === 'artist') {
  		return order === 'desc' 
  		? _.sortBy(_.sortBy(list, ['order', 'no']), ['artist', 'name'])
  		: _.sortBy(_.sortBy(list, ['order', 'no']), ['artist', 'name']).reverse();
  	}

  	if (orderBy === 'album') {
  		return order === 'desc' 
  		? _.sortBy(_.sortBy(list, ['order', 'no']), ['album', 'title'])
  		: _.sortBy(_.sortBy(list, ['order', 'no']), ['album', 'title']).reverse();
  	}

  	// Default order by title
  	return order === 'desc' 
  	? _.sortBy(list, ['title'])
  	: _.sortBy(list, ['title']).reverse();
  }

  handleRowClick(e, track) {
  	e.preventDefault();
  	console.log('handleRowClick', e)
  	// this.props.handleSelectTrack(track)
  }

	render() {
		const {
			library,
			player,
			order,
			orderBy,
			anchorEl,
			handleSelectTrack,
			handleOptionsClick,
			handleOptionsClose,
			handleMenuOptionClickEdit,
			handleMenuOptionClickDelete,
			handleCloseDetailView,
			theme,
		} = this.props;

		const styles = {
			root: {
				background: theme.palette.primary.light,
				// borderTop: `1px solid ${theme.palette.primary.main}`,
				// padding: '0px',
				// marginTop: '57px',
				marginBottom: '104px' // TODO: link value to Player + Nav height
			},
			tableHead: {
				// position: 'fixed',
				// top: 0,
				// // height: '50px',
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
			selected: {
				background: theme.palette.primary.main,
			},
		}

		// console.log(`LibraryDesktop, orderBy: ${orderBy}, ${order}`)
		return (
			<div>
				{
					library.detailViewData ? 
					<DetailCard 
						detailViewData={library.detailViewData}
						handleCloseDetailView={handleCloseDetailView} /> 
					: 
					null
				}
			{
				// <DetailCard 
				// 	detailViewData={library.detailViewData}
				// 	handleCloseDetailView={handleCloseDetailView}
				// />
			}
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
		             		<Tooltip
	              			title={column.labelText}
	              			placement="bottom-start"
	              			enterDelay={300}
	              		>
			              	<TableSortLabel
			              		active={orderBy === column.id}
			              		direction={order}
			              		onClick={this.createSortHandler(column.id)}
			              	>
			              		{column.label}
			              	</TableSortLabel>
		              	</Tooltip>
		              </TableCell>
								))
							}
						</TableRow>
					</TableHead>
					<TableBody>
						{library.tracks.length > 0 ? 
							this.sortByField(library.tracks, order, orderBy)
							.map(track => (
							<LibraryRowContainer
								key={track._id}
								track={track}
								selectedTrack={library.selectedTrack}
							/>
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
			</div>
		);
	}
}

export default withTheme()(LibraryDesktop);
