import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ThemeContext } from '../../contexts/theme.context';

import LibraryRowContainer from '../../containers/LibraryRowContainer';
import LibraryTableHead from './LibraryTableHead';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import withTheme from '@material-ui/core/styles/withTheme';

import { _ } from 'underscore';

class LibraryDesktop extends Component {
	static contextType = ThemeContext;
	state = {
		hoveredCell: null,
		windowWidth: null,
		contextPos: null,
	}

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

  handleContextMenu = e => {
  	e.preventDefault();
  	console.log('LibraryDesktop, handleContextMenu, e:', e)
  	this.setState({ 
			...this.state, 
			// anchorEl: e.currentTarget,
			contextPos: { x: e.clientX, y: e.clientY }
		});
  }

	render() {
		const {
			library,
			order,
			orderBy,
			handleRequestSort,
			handleCloseDetailView,
		} = this.props;

		const theme = this.context;

		const styles = {
			root: {
				width: '100%',
				display: 'flex',
			},
			navSpacer: {
				minWidth: `${theme.dimensions.navDesktop.width + 2}px`,
			},
			tableContainer: {
				width: '100%',
				background: theme.palette.primary.light,
				margin: `${theme.dimensions.navDesktop.marginTop}px auto ${theme.dimensions.navDesktop.marginTop * 2}px auto`,
				overflowX: 'auto',
			},
		}

		console.log('*** LibraryDesktop, this.context:', this.context)

		return (
			<div style={styles.root}>
				<div style={styles.navSpacer}></div>
				<Paper style={styles.tableContainer}>
					<Table padding="none">
						<LibraryTableHead
							order={order}
							orderBy={orderBy}
							handleRequestSort={handleRequestSort}
						/>
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
