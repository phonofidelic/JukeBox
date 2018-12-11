import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LibraryRowContainer from '../containers/LibraryRowContainer';
import {
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableSortLabel,
	// Typography,
	Tooltip,
} from '@material-ui/core';
import { Schedule } from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles';
import { _ } from 'underscore';
import DetailCard from './DetailCard';


const columnData = [
	// { id: 'empty', numeric: false, disablePadding: true, label: '', labelText: '', width: '1%' },
	{ id: 'title', numeric: false, disablePadding: false, label: 'Title', labelText: 'Title', span: 2 },
	{ id: 'duration', numeric: false, disablePadding: false, label: <Schedule />, labelText: 'Duration', width: '1%', span: 1 },
	{ id: 'artist', numeric: false, disablePadding: false, label: 'Artist', labelText: 'Artist', width: '1%', span: 1 },
	{ id: 'album', numeric: false, disablePadding: false, label: 'Album', labelText: 'Album', width: '1%', span: 1 },
]

class LibraryDesktop extends Component {
	state = {
		hoveredCell: null,
		windowWidth: null,
	}

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
			// handleSelectTrack,
			// handleOptionsClick,
			// handleOptionsClose,
			// handleMenuOptionClickEdit,
			// handleMenuOptionClickDelete,
			handleCloseDetailView,
			theme,
		} = this.props;

		const styles = {
			root: {
				width: '100%',
				display: 'flex',
			},
			navSpacer: {
				minWidth: `${theme.dimensions.navDesktop.width + 2}px`,
			},
			container: {
				width: '100%',
				background: theme.palette.primary.light,
				margin: `${theme.dimensions.navDesktop.marginTop}px auto ${theme.dimensions.navDesktop.marginTop * 2}px auto`,
				overflowX: 'auto',
			},
			tableHead: {
				backgroundColor: theme.palette.secondary.light,
				cursor: 'pointer',
			},
		}

		// console.log(`LibraryDesktop, orderBy: ${orderBy}, ${order}`)
		return (
			<div style={styles.root}>
				{
					library.detailViewData ? 
					<DetailCard 
						detailViewData={library.detailViewData}
						handleCloseDetailView={handleCloseDetailView}
					 /> 
					: 
					null
				}
				<div style={styles.navSpacer}></div>
				<Paper style={styles.container}>
					<Table padding="none">
						{
							// <colgroup>
							// 	{columnData.map((col, i) => (<col key={'col_'+i} width={col.width} />))}
							// </colgroup>
						}
						<TableHead style={styles.tableHead}>
							<TableRow>
								{/*<TableCell></TableCell>*/}
								{
									columnData.map(column => (
										<TableCell
											style={{ 
												backgroundColor: this.state.hoveredCell === column.id ? theme.palette.primary.hover : theme.palette.secondary.light,
												paddingLeft: 20,
											}}
											scope="col"
											colSpan={column.span}
											onMouseEnter={() => this.setState({ hoveredCell: column.id })}
											onMouseLeave={() => this.setState({ hoveredCell: null })}
											key={column.id}
											numeric={column.numeric}
											// width={column.widt}
			                // padding={column.disablePadding ? 'none' : 'default'}
			                sortDirection={orderBy === column.id ? order : false}
			                onClick={this.createSortHandler(column.id)}
			              >
			             		<Tooltip
		              			title={column.labelText}
		              			placement="bottom-start"
		              			enterDelay={300}
		              		>
				              	<TableSortLabel
				              		active={orderBy === column.id}
				              		direction={order}
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
				</Paper>
				<div style={styles.navSpacer}></div>
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
