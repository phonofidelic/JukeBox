import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
			order,
			orderBy,
			userAgentIsMobile,
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
				marginBottom: userAgentIsMobile ? 
					theme.dimensions.nav.navHeight + theme.dimensions.player.playerHeight 
					: 
					theme.dimensions.player.playerHeight,
				marginLeft: theme.dimensions.navDesktop.navWidth,
			},
			tableHead: {
				// position: 'fixed',
				// top: 0,
				// // height: '50px',
				// width: '100%',
				backgroundColor: theme.palette.secondary.light,
			},
		}

		// console.log(`LibraryDesktop, orderBy: ${orderBy}, ${order}`)
		return (
			<div>
				{
					library.detailViewData ? 
					<DetailCard 
						detailViewData={library.detailViewData}
						handleCloseDetailView={handleCloseDetailView}
					 /> 
					: 
					null
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

LibraryDesktop.propTypes = {
	library: PropTypes.object.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	userAgentIsMobile: PropTypes.bool.isRequired,
	handleSelectTrack: PropTypes.func.isRequired,
	handleOptionsClick: PropTypes.func.isRequired,
	handleOptionsClose: PropTypes.func.isRequired,
	handleMenuOptionClickEdit: PropTypes.func.isRequired,
	handleMenuOptionClickDelete: PropTypes.func.isRequired,
	handleCloseDetailView: PropTypes.func.isRequired,
	theme: PropTypes.object.isRequired,
}

export default withTheme()(LibraryDesktop);
