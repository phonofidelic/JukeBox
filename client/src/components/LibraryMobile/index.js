import React, { Component } from 'react';
import TrackListItemContainer from '../../containers/TrackListItemContainer';
import DetailCard from '../DetailCard';
import LibraryControls from './LibraryControls';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import withTheme from '@material-ui/core/styles/withTheme';

const ORDER_TYPES = {
	TITLE: 'title',
	ARTIST: 'artist',
	ALBUM: 'album'
};

export class LibraryMobile extends Component {
	constructor(props) {
		super(props);
		this.trackListNode = React.createRef();
	}
	state = {
		orderBy: ORDER_TYPES.TITLE,
	}

	componentDidMount() {
		const { queueIsOpen } = this.props;
		console.log('this.trackListNode:', this.trackListNode)
		queueIsOpen && this.trackListNode.current.addEventListener('touchmove', e => {
			console.log('trackListNode scroll, e:', e)
			e.preventDefault();
		}, false);
	}

	setOrder(type) {
		this.setState({
			orderBy: type
		});
	}

	render() {
		const { 
			library,
			handleOrderBy,
			handleCloseDetailView,
			theme,
		} = this.props;

		const styles = {
			root: {
				background: theme.palette.secondary.light,
				borderTop: `1px solid ${theme.palette.primary.main}`,
				padding: '0px',
				paddingTop: theme.dimensions.topNav.height + theme.dimensions.libraryControls.height,
				paddingBottom: '104px' // TODO: link value to Player + Nav height
			}
		};

		return (
			<div style={styles.root} ref={this.trackListNode}>
				{
					library.detailViewData &&
					<DetailCard 
						detailViewData={library.detailViewData}
						handleCloseDetailView={handleCloseDetailView}
					/>
				}
				<LibraryControls 
					orderBy={this.state.orderBy} 
					setOrder={this.setOrder.bind(this)} 
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
