import React, { Component } from 'react';

import { ThemeContext } from '../../contexts/theme.context';

import TrackListItemContainer from '../../containers/TrackListItemContainer';
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
	static contextType = ThemeContext;

	constructor(props) {
		super(props);
		// this.trackListNode = React.createRef();
	}
	state = {
		orderBy: ORDER_TYPES.TITLE,
	}

	// componentDidMount() {
	// 	const { queueIsOpen } = this.props;
	// 	console.log('this.trackListNode:', this.trackListNode)
	// 	queueIsOpen && this.trackListNode.current.addEventListener('touchmove', e => {
	// 		console.log('trackListNode scroll, e:', e)
	// 		e.preventDefault();
	// 	}, false);
	// }

	setOrder(type) {
		this.setState({
			orderBy: type
		});
	}

	handleDrag(e) {
		// e.preventDefault()
		console.log('draaaag')
	}

	render() {
		const { 
			library,
			handleOrderBy,
		} = this.props;

		const theme = this.context;

		const styles = {
			root: {
				background: theme.palette.secondary.light,
				borderTop: `1px solid ${theme.palette.primary.main}`,
				padding: '0px',
				// paddingTop: theme.dimensions.topNav.height + theme.dimensions.libraryControls.height,
				paddingTop: theme.dimensions.libraryControls.height,
				paddingBottom: '104px' // TODO: link value to Player + Nav height
			}
		};

		return (
			<div 
				style={styles.root} 
				// ref={this.trackListNode}
				onTouchMove={this.handleDrag}
			>
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
