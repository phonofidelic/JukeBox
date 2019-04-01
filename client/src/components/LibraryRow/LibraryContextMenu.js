import React, { Component } from 'react';
import {
	Menu,
	MenuItem
} from '@material-ui/core';

class LibraryContextMenu extends Component {
	render() {
		const { 
			track,
			anchorEl,
			handleContextMenuClose,
			handleToggleEditMode,
			handleMenuOptionClickDelete,
			handleAddToQueue,
		} = this.props;

		const styles = {
			root: {
				padding: '0px'
			}
		}

		// console.log('LibraryContextMenu, anchorEl:', anchorEl)
		return (
			<Menu
				style={styles.root}
				id="options-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleContextMenuClose}
			>
				<MenuItem onClick={() => handleAddToQueue(track)}>Add to queue</MenuItem>
				{/*<MenuItem onClick={handleToggleEditMode}>Edit info</MenuItem>*/}
				<MenuItem onClick={handleMenuOptionClickDelete}>Delete track</MenuItem>
			</Menu>
		);
	}
}

export default LibraryContextMenu;