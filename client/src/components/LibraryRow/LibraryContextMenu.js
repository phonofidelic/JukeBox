import React, { Component } from 'react';
import {
	Menu,
	MenuItem
} from '@material-ui/core';

class LibraryContextMenu extends Component {
	render() {
		const { 
			contextMenuIsOpen,
			contextPos,
			handleMenuOptionAddToQueue,
			handleContextMenuClose,
			handleToggleEditMode,
			handleMenuOptionClickDelete,
		} = this.props;

		const styles = {
			root: {
				padding: '0px',
				position: 'fixed',
				transformOrigin: 0,
			}
		}

		// console.log('LibraryContextMenu, contextPos:', contextPos)
		return (
			<Menu
				style={styles.root}
				id="options-menu"
				getContentAnchorEl={null}
				open={Boolean(contextMenuIsOpen)}
				anchorOrigin={{vertical: contextPos.y + window.scrollY, horizontal: contextPos.x}}
				onClose={handleContextMenuClose}
			>
				<MenuItem onClick={handleMenuOptionAddToQueue}>Add to queue</MenuItem>
				<MenuItem onClick={handleToggleEditMode}>Edit info</MenuItem>
				<MenuItem onClick={handleMenuOptionClickDelete}>Delete track</MenuItem>
			</Menu>
		);
	}
}

export default LibraryContextMenu;