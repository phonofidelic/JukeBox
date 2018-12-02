import React, { Component } from 'react';
import styles from './LibraryControls.styles';
import {
	Button,
	Drawer,
	MenuList,
	MenuItem,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const ORDER_TYPES = {
	TITLE: 'title',
	ARTIST: 'artist',
	ALBUM: 'album'
};

const orderMenu = [
	{ type: ORDER_TYPES.TITLE, label: 'Title'},
	{ type: ORDER_TYPES.ARTIST, label: 'Artist'},
	{ type: ORDER_TYPES.ALBUM, label: 'Album' }	
]

class LibraryControls extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			orderBy: ORDER_TYPES.TITLE,
			top: false,
		}
	};

	handleToggle = () => {
		this.setState(state => ({ open: !state.open }));
	};

	handleSelection = value => {
		console.log('handleSelection, value', value);
		this.props.setOrder(value);
		this.props.handleOrderBy(value);
		this.handleToggle();
	};

	render() {
		const { 
			orderBy, 
			theme,
			classes
		} = this.props;

		const { open } = this.state;

		return (
			<div className={classes.root}>
				<Button
					fullWidth
					className={classes.orderByButton}
		      onClick={this.handleToggle}
		    >Order by: {orderBy}
		    </Button>
		    <Drawer 
		    	anchor="top"
		    	open={open}
					onClose={this.handleToggle}
				>
					<MenuList className={classes.menuList}>
						{orderMenu.map((orderItem, i) => (
							<MenuItem 
								key={i}
								className={classes.menuItem} 
								value={orderItem.type}
								onClick={() => this.handleSelection(orderItem.type)}
							>
								{orderItem.label}
							</MenuItem>
						))}
					</MenuList>
				</Drawer>
			</div>
		);
	};
}

export default withStyles(styles)(LibraryControls);
